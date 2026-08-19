import axios from "axios";

const getUserData = async (username) => {
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

        if(role === 'EmployeeSwuActive'){
            const inactiveResponse = await axios.post(
                `https://api.swu.ac.th/centralapi/v1/EmployeeSwuNotActive/${username}`,
                {},
                {
                    headers:{
                        "Content-Type": false,
                        'x-api-key': process.env.SWU_API_X_API_KEY
                    }
                }
            );
            data.push(...inactiveResponse.data);
        }

        const data_filter = data.filter((x) => x.buasri_id === username)
        const data_sort = data_filter.sort((x, y) =>  y.start_date - x.start_date)
        const result = data_sort[0]
        return { 
            email: result.gafe_mail,
            name_th: `${result.name_th || ''} ${result.mname_th || ''} ${result.lname_th || ''}`,
            name_en: `${result.name_en || ''} ${result.mname_en || ''} ${result.lname_en || ''}`,
            type: (role === 'StudentSwu' ? 'นิสิต' : 'บุคลากร'),
            user_id: (role === 'StudentSwu' ? result.student_id : result.employee_id)
        }
    }catch(e){
        console.error('Error fetching user data:', e);
        throw new Error(`Failed to fetch user data: ${e.message}`);
    }
}

export default getUserData;