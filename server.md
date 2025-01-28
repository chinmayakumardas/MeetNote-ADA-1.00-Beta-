



server/
│
├── config/
│   └── db.js                # MongoDB connection
│   └── email.js             # Email configurations for sending OTP and notifications
├── controllers/
│   └── authController.js    # Authentication-related controllers (register, login, reset password)
│   └── userController.js    # User-related operations (status change, etc.)
├── middlewares/
│   └── authMiddleware.js    # Middleware to protect routes requiring authentication
│   └── otpMiddleware.js     # Middleware to validate OTP
├── models/
│   └── user.js             # User model (mongoose schema)
│   └── log.js              # Log model to track user actions
│   └── session.js          # Session model to handle active devices
├── routes/
│   └── auth.js             # Authentication-related routes (register, login, reset password)
│   └── user.js             # User management routes (change status)
├── services/
│   └── authService.js      # Business logic related to authentication (user creation, login, password reset)
│   └── userService.js      # User-specific business logic
├── utils/
│   └── jwt.js              # JWT utility for generating tokens
│   └── otp.js              # OTP generation and validation
│   └── emailUtils.js       # Send email utility
│   └── logger.js           # Logger utility for events
├── .env                    # Environment variables
├── server.js               # Main server file
├── package.json            # Node.js package file
└── package-lock.json       # Package lock file



/your-app
|-- /config
|   |-- db.js                 # MongoDB connection setup
|   |-- mail.js               # Mail setup (nodemailer)
|   |-- otp.js                # OTP setup
|   |-- jwt.js                # JWT token setup
|
|-- /controllers
|   |-- authController.js     # Authentication-related logic
|   |-- userController.js     # User management logic (create, update, delete)
|   |-- logController.js      # Logging actions
|
|-- /models
|   |-- userModel.js          # User schema and model
|   |-- logModel.js           # Log schema and model
|
|-- /routes
|   |-- authRoutes.js         # Auth-related routes (login, register, OTP, etc.)
|   |-- userRoutes.js         # User-related routes (manage users)
|
|-- /services
|   |-- authService.js        # Handle JWT logic and OTP logic
|   |-- emailService.js       # Handle email-related functionality
|
|-- /utils
|   |-- validate.js           # Validate user inputs
|   |-- otpUtils.js           # OTP related utility functions
|
|-- /middleware
|   |-- authMiddleware.js     # JWT validation middleware
|   |-- otpMiddleware.js      # OTP verification middleware
|
|-- /logs
|   |-- access.log            # Store application logs
|
|-- .env                      # Environment variables
|-- app.js                    # Main app entry point (Express setup)
|-- package.json              # Project dependencies
|-- README.md                 # Documentation
