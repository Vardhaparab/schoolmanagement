const school = require('../models/schoolModel');
const {calculateDistance} = require('../utils/utils');

function addSchool(req, res) {
        const { name, address, latitude, longitude } = req.body;

        const errors = [];

        if (!name || typeof name !== "string" || name.trim() === "") {
            errors.push("name is required and must be a non-empty string.");
        }

        if (!address || typeof address !== "string" || address.trim() === "") {
            errors.push("address is required and must be a non-empty string.");
        }
        const lat = Number(latitude);
        const lng = Number(longitude);

        if (isNaN(lat)) {
            errors.push("latitude is required and must be a valid number.");
        } else if (lat < -90 || lat > 90) {
            errors.push("latitude must be between -90 and 90.");
        }

        if (isNaN(lng)) {
            errors.push("longitude is required and must be a valid number.");
        } else if (lng < -180 || lng > 180) {
            errors.push("longitude must be between -180 and 180.");
        }

        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        school.addSchool([name, address, lat, lng], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                message: "School added successfully",
                school: {
                    name,
                    address,
                    latitude: lat,
                    longitude: lng
                }
            })
        })
}

function listSchools(req,res){
    const {latitude , longitude } = req.query;

    const errors =[];

   const lat = Number(latitude);
    const lng = Number(longitude);

    if (isNaN(lat)) {
      errors.push("latitude is required and must be a valid number.");
    } else if (lat < -90 || lat > 90) {
      errors.push("latitude must be between -90 and 90.");
    }

    if (isNaN(lng)) {
      errors.push("longitude is required and must be a valid number.");
    } else if (lng < -180 || lng > 180) {
      errors.push("longitude must be between -180 and 180.");
    }

     if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    school.getAllSchools((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const sorted = results
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          lat,
          lng,
          Number(school.latitude),
          Number(school.longitude)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
        message:"Fetched all schools successfully",
        data:sorted
    })
  });
 
}

module.exports ={addSchool,listSchools};