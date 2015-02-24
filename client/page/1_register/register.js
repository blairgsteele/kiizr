AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Passwod"
      },
    },
});

AccountsTemplates.configure({
    texts: {
        navSignIn: "signIn",
        navSignOut: "signOut",
        optionalField: "optional",
        pwdLink_pre: "asdasd asdasda sd asd s ",
        pwdLink_link: "forgotPassword",
        pwdLink_suff: "",
        sep: "OR",
        signInLink_pre: "If you already have an account, please ",
        signInLink_link: "signin",
        signInLink_suff: "",
        signUpLink_pre: "Join the Kiizr family today when you ",
        signUpLink_link: "signUp",
        signUpLink_suff: "",
        socialAdd: "add",
        socialConfigure: "configure",
        socialIcons: {
            "meteor-developer": "fa fa-rocket",
        },
        socialRemove: "remove",
        socialSignIn: "signIn",
        socialSignUp: "signUp",
        socialWith: "with",
        termsPreamble: "By providing your email address you agree to receive product information from Kiizr Jamaica Ltd. and also agree to our ",
        termsPrivacy: "privacyPolicy",
        termsAnd: "and",
        termsTerms: "terms",
    }
});
                            
AccountsTemplates.configure({
    texts: {
      title: {
        changePwd: "Change Password",
        enrollAccount: "Enroll",
        forgotPwd: "Forgot Password",
        resetPwd: "Reset Password",
        signIn: "Welcome",
        signUp: "Welcome to the family",
      }
    }
});

AccountsTemplates.configure({
    texts: {
        button: {
          changePwd: "Password",
          enrollAccount: "Enroll",
          forgotPwd: "Forgot Pwd",
          resetPwd: "Reset Pwd",
          signIn: "Sign In",
          signUp: "Sign Up",
        }
    }
});

AccountsTemplates.addFields([
  { _id: 'password_again', type: 'password', required: true,
    displayName: "Verfiy Password", placeholder: 'Verfiy Password' },
  
  { _id: 'phonenumber', type: 'tel', required: false,
    displayName: "Phone Number", placeholder: '171-7171' }, 
  
  { _id: 'firstname', type: 'text', required: true, minLength: 2,
    displayName: "First Name", placeholder: 'Kiizr' },
  
  { _id: 'lastname', type: 'text', required: true, minLength: 2,
    displayName: "Last Name", placeholder: 'Caribbean' }, 
]); 