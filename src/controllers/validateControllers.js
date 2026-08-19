import { mysql_backend_jame_libswu } from "../config/db.js";

export const validateEmails = async (req, res) => {
    const { emails } = req.body;
    console.log('Received emails for validation:', emails);
    if (!emails || !Array.isArray(emails)) {
        return res.status(400).json({ message: 'Invalid request: emails must be an array' });
    }
    try{
        const mysql_connection = await mysql_backend_jame_libswu.getConnection();
        const emailsValidationResults = await Promise.all(emails.map(async (email) => {
            console.log('Validating email:', email);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const statement = `SELECT COUNT(*) AS count FROM users WHERE gafe_mail = ?`;
            const [result, fields] = await mysql_connection.execute(statement, [email]);
            const isValid = emailRegex.test(email) && result[0].count > 0;
            return { email, isValid };
        }));
        res.status(200).json({ results: emailsValidationResults });
        }catch(err){
            console.error('Error during email validation:', err);
            return res.status(500).json({
                message: 'Internal Server Error: Unable to validate emails'
            });
        }
    }