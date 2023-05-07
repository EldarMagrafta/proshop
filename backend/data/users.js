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
2) A randomly generated salt is ADDED to the password. The salt is a long, random string of characters that is unique to each password.
3) The salted password is passed through a one-way hash function. The result is a hash that is unique to the password and salt combination.
4) The hash. with the salt  embedded inside it is stored in the database
5) When the user wants to log in, they enter their password.
6) The salt associated with their account is retrieved from the hash string in the database.
7) The salt and user-input-password are combined and passed through the same hash function used during registration.
8) The resulting hash is compared to the hash stored in the database.
9) If the hashes match, the user is granted access to their account. If they don't match, access is denied.

This process ensures that even if an attacker gains access to the password database, they will not be able to easily obtain the plain text passwords of the users.
*/

/*
When you use a hash function like bcrypt to hash a password, it actually generates a string that is the hashed version of the password, along with some additional information about the hashing process. 
One of the pieces of information that is included INSIDE the hash string is the salt that was used during the hashing process.
So, when you store the hashed password in your database, you don't need to store the salt separately - it is INCLUDED in the hash string itself. 
Then, when a user tries to log in, you can use the stored hash string to verify their password by re-hashing the password they provide with the same salt that was used when the password was originally hashed. 
If the same password and salt are used as before, the hash function will generate the same hash string as before.
*/