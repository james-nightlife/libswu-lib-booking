import axios from "axios";

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    console.log(username)
    const role = (/^[a-z]{2}[0-9]{9}$/.test(username) ? 'StudentSwu' : 'EmployeeSwuActive');
    console.log(role)
    try{
        const response = await axios.post(
            `https://api.swu.ac.th/centralapi/v1/${role}/${username}`,
            {},
            {
                headers:{
                    "Content-Type": false,
                    'x-api-key': process.env.SWU_API_X_API_KEY
                }
            }
            );
        const data = response.data
        const data_filter = data.filter((x) => x.buasri_id === username)
        const data_sort = data_filter.sort((x, y) => x.start_date - y.start_date)
        const result = data_sort[0]
        return res.status(200).json({ 
            email: result.gafe_mail,
            name_th: `${result.name_th || ''} ${result.mname_th || ''} ${result.lname_th || ''}`,
            name_en: `${result.name_en || ''} ${result.mname_en || ''} ${result.lname_en || ''}`,
            type: (role === 'StudentSwu' ? 'นิสิต' : result.staff_type === 'S' ? 'เจ้าหน้าที่' : 'อาจารย์')
         });
    }catch(e){
        return res.status(500).json({
            'message': e.message
        })
    }
}