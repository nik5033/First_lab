function check_email(email){
    let emails = new RegExp("[\\w0-9_-]+@[\\w0-9_-]+\\.[\\w]{2,4}",'ig');
    return emails.test(email);
}
