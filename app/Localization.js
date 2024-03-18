export const translations = {
  en: {
    cancel: "cancel",
    submit: "Submit",
    accept: "Accept",
    next: "Next",
    signNav: {
      signIn: "Sign In",
      signUp: "Sign Up",
    },
    signUpDriver: {
      input: {
        first_name: {
          placeholder: "Enter your first name",
        },
        last_name: {
          placeholder: "Enter your last name",
        },
        phone: {
          placeholder: "Enter your phone number",
        },
        car_type: {
          placeholder: "Vehicle Manufacteur",
        },
        car_color: {
          placeholder: "Vehicle color",
        },
        car_plate: {
          placeholder: "Enter your car plate",
        },
        password: {
          placeholder: "Enter your password",
        },
        confirm_password: {
          placeholder: "Confirm your password",
        },
        year: {
          placeholder: "Vehicle year",
        },
        model: {
          placeholder: "Vehicle model",
        },
        plate_number: {
          placeholder: "Plate number",
        },
      },
      error: {
        first_name: {
          empty: "Please enter your first name",
          length: "Firt name should be at least 3 characters",
        },
        last_name: {
          empty: "Please enter your last name",
          length: "Last name should be at least 3 characters",
        },
        phone: {
          empty: "Please enter your phone number",
          invalid: "Invalid phone number",
          inUse:
            "This phone number is already in use. Please choose a different one.",
        },
        car_type: {
          type: "Car type should be one of the following: Car, Bicycle, Moto, or TukTuk",
        },
        car_color: {
          empty: "Please enter your car color",
          length: "Car color should be at least 3 characters",
        },
        car_plate: {
          empty: "Please enter your car plate number",
          length: "Car plate should be at least 6 numbers",
        },
        password: {
          emtpy: "Please enter your password",
          invalid: "Password should contain at least 8 characters.",
        },
        confirm_password: {
          empty: "Please confirm your password",
          notMatch: "Passwords do not match",
        },
      },
      addImage: {
        text: "Add your profile image(optional):",
        textButton: "Select Image",
      },
      button: {
        signup: "Sign Up",
        submitting: "Submitting...",
      },
    },
    signInDriver: {
      title: "Sign In",
      text: "Log in to your existing account of Pickme up",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      signUp: "Sgin Up",
      signIn: "Sign In",
      forgotPass: "Forgot password?",
    },
    toast: {
      error: {
        emptyFields: "Please fill all fields",
        submissionFailedTitle: "Form submission failed",
        submissionFailedSubTitle: "Please check the errors and try again.",
      },
      success: {
        registered: "Registered successfully",
      },
      info: {
        noChanges: "No changes were made",
      },
    },
    drawerContent: {
      home: "Home",
      payment: "Payment",
      chat: "Chat",
      rides: "Rides",
      settings: "Settings",
      logOut: "Log Out",
      viewProfile: "View Profile",
      rating: "Rating",
    },
    driverNav: {
      screens: {
        back: "Back",
        payment: "Payment",
        rides: "Rides",
        settings: "Settings",
        switchLang: "Switch language",
        editProfile: "Edit Profile",
        notifications: "Notifications",
        chat: "Chat",
        about: "About",
        support: "Support",
      },
    },
    setting: {
      lang: "Change language",
      about: "About",
      support: "Support",
      deleteAccount: {
        text: "Delete Account",
        titleAlert: "Delete Account",
        subTitleAlert: "Are you sure you want to delete the account?",
        AlertButtons: "Delete",
      },
    },
    about:
      " Experience top-notch taxi and delivery services with Wobble. Easy to use, affordable prices, and available nationwide services in the whole country of Lebanon. (For customers) Join our vibrant community with zero commissions and flexible rules. Simply pay the monthly fee to activate your account and get an access to receive orders from customers. (For drivers who would like to have a job in Wobble) Welcome to the Wobble community  Where smooth rides await !",
    support: {
      contact: "Contact Us:",
      phone: "Phone Number:",
      insta: "Instagram:",
    },
    map: {
      fetchLocation: "Fetching location",
      loadingMap: "Loading map...",
      notGranted: "Location permission not granted",
      gotOrder: "You got an order",
      askAccept: "Do you want to take it?",
    },
    accRecovery: {
      recovery: "Account recovery",
      fullName: "Full Name",
      phone: "Phone Number",
      newPass: "New Password",
      confirmPass: "Confirm Password",
    },
    editProfile: {
      addPhoto: "Add Photo",
      editPhoto: "Edit Photo",
      save: "Save",
      saving: "Saving...",
      dataSaved: "Data saved successfully",
    },
    chat: {
      send: "Send",
      sending: "Sending",
      loadingChat: "Loading chat...",
      type: "Type your message",
    },
    driverData: {
      riderDetails: "Rider Details",
      name: "Name",
    },
    tripCard: {
      to: "to",
      ride: {
        completed: "Ride completed",
        canceled: "Ride canceled",
      },
    },
  },
  ar: {
    cancel: "إلغاء",
    submit: "إرسال",
    accept: "قبول",
    next: "التالي",
    signNav: {
      signIn: "تسجيل دخول",
      signUp: "تسجيل حساب",
    },
    signUpDriver: {
      input: {
        first_name: {
          label: "الإسم الأول",
          placeholder: "ادخل إسمك الأول",
        },
        last_name: {
          label: "الإسم الأخير",
          placeholder: "ادخل إسمك الأخير",
        },
        phone: {
          label: "رقم الهاتف",
          placeholder: "ادخل رقم هاتفك",
          inUse: "رقم الهاتف هذا قيد الاستخدام بالفعل. الرجاء اختيار رقم آخر.",
        },
        car_type: {
          label: "نوع السيارة",
          placeholder: "ادخل نوع سيارتك",
        },
        car_color: {
          label: "لون السيارة",
          placeholder: "ادخل لون سيارتك",
        },
        car_plate: {
          label: "نمرة السيارة(اختياري):",
          placeholder: "ادحل نمرة سيارتك",
        },
        password: {
          label: "كلمة السر",
          placeholder: "ادخل كلمة السر",
        },
        confirm_password: {
          label: "تأكيد كلمة السر",
          placeholder: "أكد كلمة السر",
        },
      },
      error: {
        first_name: {
          empty: "الرجاء إدخال إسمك الأول",
          length: "يجب أن يحتوي الإسم الأول على الأقل ثلاث أحرف",
        },
        last_name: {
          empty: "الرجاء إدخال الإسم الأخير",
          length: "يجب أن يحتوي الإسم الثاني على الأقل ثلاث أحرف",
        },
        phone: {
          empty: "الرجاء إدخال رقم الهاتف",
          invalid: "رقم هاتف غير صالح",
        },
        car_type: {
          type: "يجب أن يكون نوع السيارة واحدًا مما يلي:Car or Bicycle or Moto or TukTuk",
        },
        car_color: {
          empty: "الرجاء إدخال لون السيارة",
          length: "يجب أن لا يقل لون السيارة عن 3 أحرف",
        },
        car_plate: {
          empty: "الرجاء إدخال رقم لوحة سيارتك",
          length: "يجب أن تكون لوحة السيارة مكونة من 6 أرقام على الأقل",
        },
        password: {
          emtpy: "الرجاء إدخال كلمة السر",
          invalid: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.",
        },
        confirm_password: {
          empty: "الرجاء تأكيد كلمة السر",
          notMatch: "كلمة المرور غير مطابقة",
        },
      },
      addImage: {
        text: ":أضف صورتك الشخصية(إختياري)",
        textButton: "إختر صورة",
      },
      button: {
        signup: "تسجيل حساب",
        submitting: "جاري التسجيل...",
      },
    },
    signInDriver: {
      title: "تسجيل الدخول",
      text: "قم بتسجيل الدخول إلى حسابك الحالي في Pickme up",
      forgotPassword: "نسيت كلمة السر؟",
      noAccount: "ليس لديك حساب؟",
      signUp: "اشترك",
      signIn: "تسجيل دخول",
      forgotPass: "نسيت كلمة السر؟",
    },
    toast: {
      error: {
        emptyFields: "الرجاء تعبئة جميع المجالات",
        submissionFailedTitle: "فشل الإرسال",
        submissionFailedSubTitle:
          "الرجاء التأكد من الأخطاء وإعادة الإرسال مجدداً",
      },
      success: {
        registered: "تم إنشاء الحساب",
      },
      info: {
        noChanges: "لم يتم إجراء أية تغييرات",
      },
    },
    drawerContent: {
      home: "الرئيسية",
      chat: "الدردشة",
      payment: "طريقة الدفع",
      rides: "رحلاتك السابقة",
      settings: "الإعدادات",
      logOut: "تسجيل الخروج",
      viewProfile: "الملف الشخصي",
      rating: "تقييم",
    },
    driverNav: {
      screens: {
        back: "الرجوع",
        payment: "طريقة الدفع",
        rides: "الرحلات السابقة",
        settings: "الإعدادات",
        switchLang: "تغيير اللغة",
        editProfile: "تعديل الملف الشخصي",
        notifications: "الإشعارات",
        chat: "الدردشة",
        about: "حول التطبيق",
        support: "الدعم",
      },
    },
    setting: {
      lang: "تغيير اللغة",
      about: "حول التطبيق",
      support: "دعم",
      deleteAccount: {
        text: "حذف الحساب",
        titleAlert: "حذف الحساب",
        subTitleAlert: "هل أنت متأكد أنك تريد حذف الحساب؟",
        AlertButtons: "حذف",
      },
    },
    about:
      "استمتع بتجربة خدمات سيارات الأجرة والتوصيل من الدرجة الأولى مع Wobble. سهلة ل  الاستخدام والأسعار المعقولة والخدمات المتاحة على المستوى الوطني بشكل عام  بلد لبنان. (للعملاء) انضم إلى مجتمعنا النابض بالحياة مع الصفر اللجان والقواعد المرنة. ما عليك سوى دفع الرسوم الشهرية للتفعيل حسابك والحصول على إمكانية الوصول لتلقي الطلبات من العملاء. (ل السائقون الذين يرغبون في الحصول على وظيفة في Wobble) مرحبًا بكم في Wobble المجتمع حيث تنتظر الرحلات السلسة!",
    support: {
      contact: "تواصل معنا:",
      phone: "رقم الهاتف:",
      insta: "انتسغرام:",
    },
    map: {
      fetchLocation: "جارٍ تحديد الموقع",
      loadingMap: "جارٍ تحميل الخريطة...",
      notGranted: "لم يتم منح إذن تحديد الموقع",
      gotOrder: "لقد تلقيتَ طلبية",
      askAccept: "هل تريد أن توافق على هذه الطلبية؟",
    },
    accRecovery: {
      recovery: "استرجاع الحساب",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      newPass: "كلمة السر الجديدة",
      confirmPass: "تأكيد كلمة السر",
    },
    editProfile: {
      addPhoto: "أضف صورة",
      editPhoto: "تعديل الصورة",
      save: "تحفيظ",
      saving: "جاري التحفيظ",
      dataSaved: "تم تعديل المعلومات بنجاح",
    },
    chat: {
      send: "إرسال",
      sending: "جاري الإرسال...",
      loadingChat: "جارٍ تحميل الدردشة...",
      type: "اكتب رسالتك",
    },
    driverData: {
      riderDetails: "تفاصيل الراكب",
      name: "الاسم",
    },
    tripCard: {
      to: "إلى",
      ride: {
        completed: "رحلة مكتملة",
        canceled: "رحلة ملتغية",
      },
    },
  },
};
