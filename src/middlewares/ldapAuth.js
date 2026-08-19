import { authenticate } from "ldap-authentication";

const ldapAuth = (username, password, url) => {
    try{
        return authenticate({
            ldapOpts: {
                url: 'ldap://ldap.swu.ac.th',
            },
            userDn: username,
            userPassword: password,
            attribute: [],
        });
    } catch (err) {
        console.error('Error during LDAP authentication:', err);
        throw err;
    }
};

export default ldapAuth;