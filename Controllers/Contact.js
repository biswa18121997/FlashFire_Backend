import ContactUsModel from "../Schema_Models/ContactUs.js";

export async function Contact(req, res) {
    try {
        let {firstName, lastName, email, message, currentRole} = req.body;
        await ContactUsModel.create({firstName, lastName, email, message, currentRole});
        res.status(201).json({ message: "Contact form submitted successfully." });
       
    } catch (error) {
        console.log(error)
    }

    

    
}