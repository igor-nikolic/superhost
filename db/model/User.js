const sql = require("../connection");
class User {
  constructor(id, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
  checkEmailAvailability() {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM user WHERE email = ?",
        [this.email],
        (err, res) => {
          if (err) reject(err);
          res.length > 0 ? resolve(false) : resolve(true);
        }
      );
    });
  }
  registerUser() {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO user (first_name,last_name,email,password,balance) VALUES (?,?,?,?,?)",
        [this.firstName, this.lastName, this.email, this.password, 0],
        (err, res) => {
          if (err) reject(err);
          if (res && res.insertId) resolve(res.insertId);
          reject(false);
        }
      );
    });
  }
}
module.exports = User;
