// ==========================================
// PART-TIME DRIVER APPLICATION
// Main JavaScript File
// ==========================================


// ==========================================
// SAMPLE DRIVERS
// ==========================================

let defaultDrivers = [
    {
        id: 1,
        name: "Ravi Kumar",
        email: "ravi@gmail.com",
        phone: "9876543210",
        experience: 5,
        license: "TS123456",
        vehicle: "Car",
        location: "Hyderabad",
        availability: "Available",
        rating: 4.5
    },

    {
        id: 2,
        name: "Suresh Reddy",
        email: "suresh@gmail.com",
        phone: "9876501234",
        experience: 8,
        license: "TS654321",
        vehicle: "SUV",
        location: "Secunderabad",
        availability: "Available",
        rating: 4.8
    },

    {
        id: 3,
        name: "Arjun Rao",
        email: "arjun@gmail.com",
        phone: "9988776655",
        experience: 3,
        license: "TS789123",
        vehicle: "Sedan",
        location: "Hyderabad",
        availability: "Busy",
        rating: 4.2
    }
];


// ==========================================
// INITIALIZE DATA
// ==========================================

if (!localStorage.getItem("drivers")) {
    localStorage.setItem("drivers",
        JSON.stringify(defaultDrivers));
}

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

if (!localStorage.getItem("bookings")) {
    localStorage.setItem("bookings", JSON.stringify([]));
}

if (!localStorage.getItem("reviews")) {
    localStorage.setItem("reviews", JSON.stringify([]));
}

if (!localStorage.getItem("notifications")) {
    localStorage.setItem("notifications", JSON.stringify([]));
}


// ==========================================
// USER REGISTRATION
// ==========================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let user = {
            id: Date.now(),
            name: document.getElementById("regName").value,
            email: document.getElementById("regEmail").value,
            phone: document.getElementById("regPhone").value,
            password: document.getElementById("regPassword").value
        };

        let exists = users.some(
            u => u.email === user.email
        );

        if (exists) {
            alert("Email already registered.");
            return;
        }

        users.push(user);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registration successful!");

        window.location.href = "login.html";
    });
}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let email =
            document.getElementById("loginEmail").value;

        let password =
            document.getElementById("loginPassword").value;

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(
            u => u.email === email &&
                 u.password === password
        );

        if (user) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            alert("Login successful!");

            window.location.href = "drivers.html";

        } else {

            alert("Invalid email or password.");

        }
    });
}


// ==========================================
// DRIVER REGISTRATION
// ==========================================

const driverRegisterForm =
    document.getElementById("driverRegisterForm");

if (driverRegisterForm) {

    driverRegisterForm.addEventListener("submit",
        function(e) {

        e.preventDefault();

        let drivers =
            JSON.parse(localStorage.getItem("drivers")) || [];

        let driver = {

            id: Date.now(),

            name:
                document.getElementById("driverName").value,

            email:
                document.getElementById("driverEmail").value,

            phone:
                document.getElementById("driverPhone").value,

            experience:
                document.getElementById("driverExperience").value,

            license:
                document.getElementById("license").value,

            vehicle:
                document.getElementById("vehicle").value,

            location:
                document.getElementById("location").value,

            availability:
                document.getElementById("availability").value,

            rating: 0
        };

        drivers.push(driver);

        localStorage.setItem(
            "drivers",
            JSON.stringify(drivers)
        );

        alert("Driver registration successful!");

        window.location.href = "drivers.html";

    });
}


// ==========================================
// DISPLAY DRIVERS
// ==========================================

function displayDrivers() {

    let container =
        document.getElementById("driversList");

    if (!container) return;

    let drivers =
        JSON.parse(localStorage.getItem("drivers")) || [];

    let search =
        document.getElementById("searchDriver")
        ?.value
        .toLowerCase() || "";

    let filter =
        document.getElementById("filterAvailability")
        ?.value || "All";

    let filtered = drivers.filter(driver => {

        let matchesSearch =
            driver.name.toLowerCase().includes(search) ||
            driver.location.toLowerCase().includes(search);

        let matchesFilter =
            filter === "All" ||
            driver.availability === filter;

        return matchesSearch && matchesFilter;
    });

    container.innerHTML = "";

    if (filtered.length === 0) {

        container.innerHTML =
            "<p>No drivers found.</p>";

        return;
    }

    filtered.forEach(driver => {

        let availabilityClass =
            driver.availability.toLowerCase();

        container.innerHTML += `

            <div class="driver-card">

                <h3>🚗 ${driver.name}</h3>

                <p>
                    📍 Location:
                    ${driver.location}
                </p>

                <p>
                    🚘 Vehicle:
                    ${driver.vehicle}
                </p>

                <p>
                    👨‍✈️ Experience:
                    ${driver.experience} years
                </p>

                <p>
                    ⭐ Rating:
                    ${driver.rating || "New"}
                </p>

                <p class="${availabilityClass}">
                    ● ${driver.availability}
                </p>

                <a href="driver-profile.html?id=${driver.id}"
                   class="btn">
                   View Profile
                </a>

            </div>
        `;
    });
}


// Automatically display drivers
if (document.getElementById("driversList")) {
    displayDrivers();
}


// ==========================================
// DRIVER PROFILE
// ==========================================

function showDriverProfile() {

    let container =
        document.getElementById("driverProfile");

    if (!container) return;

    let params =
        new URLSearchParams(window.location.search);

    let id =
        Number(params.get("id"));

    let drivers =
        JSON.parse(localStorage.getItem("drivers")) || [];

    let driver =
        drivers.find(d => d.id === id);

    if (!driver) {

        container.innerHTML =
            "<h2>Driver not found.</h2>";

        return;
    }

    container.innerHTML = `

        <div class="driver-card">

            <h1>👨‍✈️ ${driver.name}</h1>

            <p><strong>Location:</strong>
                ${driver.location}
            </p>

            <p><strong>Phone:</strong>
                ${driver.phone}
            </p>

            <p><strong>Email:</strong>
                ${driver.email}
            </p>

            <p><strong>Experience:</strong>
                ${driver.experience} years
            </p>

            <p><strong>Vehicle:</strong>
                ${driver.vehicle}
            </p>

            <p><strong>License:</strong>
                ${driver.license}
            </p>

            <p><strong>Availability:</strong>
                ${driver.availability}
            </p>

            <p><strong>Rating:</strong>
                ⭐ ${driver.rating || "New"}
            </p>

            ${
                driver.availability === "Available"
                ?
                `<a href="book-driver.html?driver=${driver.id}"
                   class="btn">
                   Book This Driver
                </a>`
                :
                `<button class="btn" disabled>
                    Driver Not Available
                 </button>`
            }

        </div>
    `;
}


// ==========================================
// LOAD DRIVER FOR BOOKING
// ==========================================

function loadBookingDriver() {

    let input =
        document.getElementById("bookingDriver");

    if (!input) return;

    let params =
        new URLSearchParams(window.location.search);

    let id =
        Number(params.get("driver"));

    let drivers =
        JSON.parse(localStorage.getItem("drivers")) || [];

    let driver =
        drivers.find(d => d.id === id);

    if (driver) {

        input.value = driver.name;

        input.dataset.id = driver.id;
    }
}


// ==========================================
// BOOK DRIVER
// ==========================================

const bookingForm =
    document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit",
        function(e) {

        e.preventDefault();

        let currentUser =
            JSON.parse(
                localStorage.getItem("currentUser")
            );

        if (!currentUser) {

            alert("Please login before booking.");

            window.location.href = "login.html";

            return;
        }

        let driverInput =
            document.getElementById("bookingDriver");

        let driverId =
            Number(driverInput.dataset.id);

        let drivers =
            JSON.parse(localStorage.getItem("drivers"));

        let driver =
            drivers.find(d => d.id === driverId);

        if (!driver) {

            alert("Driver not found.");

            return;
        }

        let booking = {

            id:
                "BK" + Date.now(),

            userId:
                currentUser.id,

            userName:
                currentUser.name,

            driverId:
                driver.id,

            driverName:
                driver.name,

            driverPhone:
                driver.phone,

            date:
                document.getElementById("bookingDate").value,

            startTime:
                document.getElementById("startTime").value,

            endTime:
                document.getElementById("endTime").value,

            pickup:
                document.getElementById("pickup").value,

            destination:
                document.getElementById("destination").value,

            paymentMethod:
                document.getElementById("paymentMethod").value,

            amount:
                calculateAmount(),

            paymentStatus:
                "Pending",

            status:
                "Confirmed"
        };

        let bookings =
            JSON.parse(localStorage.getItem("bookings")) || [];

        bookings.push(booking);

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );


        // Notification
        let notifications =
            JSON.parse(
                localStorage.getItem("notifications")
            ) || [];

        notifications.push({

            id: Date.now(),

            message:
                `Booking ${booking.id} confirmed with ${driver.name}`,

            date:
                new Date().toLocaleString()

        });

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );


        // Save latest booking
        localStorage.setItem(
            "latestBooking",
            JSON.stringify(booking)
        );

        window.location.href =
            "booking-confirmation.html";

    });
}


// ==========================================
// CALCULATE PAYMENT
// ==========================================

function calculateAmount() {

    let start =
        document.getElementById("startTime")?.value;

    let end =
        document.getElementById("endTime")?.value;

    if (!start || !end) {
        return 0;
    }

    let startParts =
        start.split(":");

    let endParts =
        end.split(":");

    let startHour =
        Number(startParts[0]);

    let endHour =
        Number(endParts[0]);

    let hours =
        endHour - startHour;

    if (hours <= 0) {
        hours = 1;
    }

    return hours * 300;
}


// ==========================================
// BOOKING CONFIRMATION
// ==========================================

function showConfirmation() {

    let container =
        document.getElementById("confirmationDetails");

    if (!container) return;

    let booking =
        JSON.parse(
            localStorage.getItem("latestBooking")
        );

    if (!booking) {

        container.innerHTML =
            "<p>No booking information found.</p>";

        return;
    }

    container.innerHTML = `

        <p><strong>Booking ID:</strong>
            ${booking.id}
        </p>

        <p><strong>Driver:</strong>
            ${booking.driverName}
        </p>

        <p><strong>Phone:</strong>
            ${booking.driverPhone}
        </p>

        <p><strong>Date:</strong>
            ${booking.date}
        </p>

        <p><strong>Time:</strong>
            ${booking.startTime}
            -
            ${booking.endTime}
        </p>

        <p><strong>Pickup:</strong>
            ${booking.pickup}
        </p>

        <p><strong>Destination:</strong>
            ${booking.destination}
        </p>

        <p><strong>Amount:</strong>
            ₹${booking.amount}
        </p>

        <p><strong>Payment:</strong>
            ${booking.paymentMethod}
        </p>

        <p><strong>Status:</strong>
            ${booking.status}
        </p>
    `;
}


// ==========================================
// DISPLAY BOOKINGS
// ==========================================

function displayBookings() {

    let container =
        document.getElementById("bookingList");

    if (!container) return;

    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) {

        container.innerHTML =
            `<p>Please login to view bookings.</p>`;

        return;
    }

    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];

    let userBookings =
        bookings.filter(
            b => b.userId === currentUser.id
        );

    container.innerHTML = "";

    if (userBookings.length === 0) {

        container.innerHTML =
            "<p>No bookings found.</p>";

        return;
    }

    userBookings.forEach(booking => {

        container.innerHTML += `

            <div class="booking-card">

                <h3>
                    Booking ID: ${booking.id}
                </h3>

                <p>
                    👨‍✈️ Driver:
                    ${booking.driverName}
                </p>

                <p>
                    📞 Contact:
                    ${booking.driverPhone}
                </p>

                <p>
                    📅 Date:
                    ${booking.date}
                </p>

                <p>
                    🕒 Time:
                    ${booking.startTime}
                    -
                    ${booking.endTime}
                </p>

                <p>
                    📍 Pickup:
                    ${booking.pickup}
                </p>

                <p>
                    🏁 Destination:
                    ${booking.destination}
                </p>

                <p>
                    💰 Amount:
                    ₹${booking.amount}
                </p>

                <p>
                    💳 Payment:
                    ${booking.paymentMethod}
                </p>

                <p>
                    Status:
                    <span class="status">
                        ${booking.status}
                    </span>
                </p>

                <br>

                <a href="ratings.html"
                   class="btn">
                   Rate Driver
                </a>

            </div>
        `;
    });
}


// ==========================================
// RATINGS & REVIEWS
// ==========================================

const ratingForm =
    document.getElementById("ratingForm");

if (ratingForm) {

    ratingForm.addEventListener("submit",
        function(e) {

        e.preventDefault();

        let reviews =
            JSON.parse(
                localStorage.getItem("reviews")
            ) || [];

        let review = {

            id: Date.now(),

            driver:
                document.getElementById(
                    "ratingDriver"
                ).value,

            rating:
                document.getElementById(
                    "rating"
                ).value,

            review:
                document.getElementById(
                    "review"
                ).value,

            date:
                new Date().toLocaleDateString()
        };

        reviews.push(review);

        localStorage.setItem(
            "reviews",
            JSON.stringify(reviews)
        );

        alert("Thank you! Your review has been submitted.");

        ratingForm.reset();

    });
}


// ==========================================
// NOTIFICATIONS
// ==========================================

function displayNotifications() {

    let container =
        document.getElementById("notificationList");

    if (!container) return;

    let notifications =
        JSON.parse(
            localStorage.getItem("notifications")
        ) || [];

    container.innerHTML = "";

    if (notifications.length === 0) {

        container.innerHTML =
            "<p>No notifications available.</p>";

        return;
    }

    notifications.reverse().forEach(notification => {

        container.innerHTML += `

            <div class="notification-card">

                <h3>🔔 Notification</h3>

                <p>
                    ${notification.message}
                </p>

                <small>
                    ${notification.date}
                </small>

            </div>
        `;
    });
}


// ==========================================
// PAYMENTS
// ==========================================

function displayPayments() {

    let container =
        document.getElementById("paymentList");

    if (!container) return;

    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];

    container.innerHTML = "";

    bookings.forEach(booking => {

        container.innerHTML += `

            <div class="payment-card">

                <h3>
                    Booking ${booking.id}
                </h3>

                <p>
                    Driver:
                    ${booking.driverName}
                </p> 
