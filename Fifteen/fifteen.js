function check_email(email){
    let emails = new RegExp("[\\w0-9.!#$%&'*+-\\/=?^_`{|}~]+@[\\w0-9.!#$%&'*+-\\/=?^_`{|}~]+\\.[\\w0-9-]{2,4}",'i');
    return emails.test(email);
}

module.exports.check_email = check_email;