export const REGEX = {
    // Description : In this Pattern +91 will be the prefix in the Mobile number(of 10 digits).
    MOBILE_NUMBER: '^((\+){1}91){1}[1-9]{1}[0-9]{9}$',
    // Description : In this Pattern only characters will be accepted and can be used for firstName and lastname.
    NAME: '^[a-zA-Z]*$',
    // Description : In this Pattern email should match this pattern eg. < example > @ < mail >.< com >.
    EMAIL: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
    // Description : In this Pattern only characters will be accepted and can be used for firstName and lastname.
    // PASSWORD: '^(?=.*[0-9]+.*)(?=.*\d)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$'
    // PASSWORD: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
    PASSWORD: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'

};
