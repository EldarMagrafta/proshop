import bycrpt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bycrpt.hashSync('123456', 10),
        isAdmin: true,
    },

    {
        name: "Avi Doe",
        email: "Avi@example.com",
        password: bycrpt.hashSync('123456', 10),
      
    },

    {
        name: "Benny Doe",
        email: "Benny@example.com",
        password: bycrpt.hashSync('123456', 10),
    }
]

export default users;

/*
1) The password is received from the user.
2) A randomly generated salt is added to the password. The salt is a long, random string of characters that is unique to each password.
3) The salted password is passed through a one-way hash function. The result is a hash that is unique to the password and salt combination.
4) The hash is stored in the database along with the salt.
5) When the user wants to log in, they enter their password.
6) The salt associated with their account is retrieved from the database.
7) The salt and password are combined and passed through the same hash function used during registration.
8) The resulting hash is compared to the hash stored in the database.
9) If the hashes match, the user is granted access to their account. If they don't match, access is denied.

This process ensures that even if an attacker gains access to the password database, they will not be able to easily obtain the plain text passwords of the users.
*/