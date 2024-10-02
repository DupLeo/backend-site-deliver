var userModel = require('./userModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createStudentDBService = async (userDetails) => {
    try {
        var userModelData = new userModel();

        userModelData.firstname = userDetails.firstname;
        userModelData.lastname = userDetails.lastname;
        userModelData.email = userDetails.email;

        // Vérifiez que l'email n'existe pas déjà
        const existingUser = await userModel.findOne({ email: userDetails.email });
        if (existingUser) {
            console.log("User already exists with this email.");
            return false;
        }

        // Chiffrement du mot de passe
        var encrypted = encryptor.encrypt(userDetails.password);
        userModelData.password = encrypted;

        // Sauvegarder l'utilisateur
        await userModelData.save();
        console.log("User saved successfully!");
        return true; // Résolution réussie
    } catch (error) {
        console.log("Error in saving user:", error);
        return false; // Échec
    }
};

module.exports.loginuserDBService = async (userDetails) => {
    try {
        const result = await userModel.findOne({ email: userDetails.email });

        if (result !== undefined && result !== null) {
            var decrypted = encryptor.decrypt(result.password);

            if (decrypted === userDetails.password) {
                return { status: true, msg: "User Validated Successfully" };
            } else {
                return { status: false, msg: "User Validation Failed" };
            }
        } else {
            return { status: false, msg: "User not found" };
        }
    } catch (error) {
        return { status: false, msg: "Invalid Data" };
    }
};
