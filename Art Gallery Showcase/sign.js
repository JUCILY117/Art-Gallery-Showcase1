function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
   }


   var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    function login() {
        var firstName = document.querySelector('.register-container .input-box:nth-child(1) input').value;
        var lastName = document.querySelector('.register-container .input-box:nth-child(2) input').value;
        var email = document.querySelector('.register-container .input-box:nth-child(3) input').value;
        var password = document.querySelector('.register-container .input-box:nth-child(4) input').value;

        if (firstName && lastName && email && password) {
            x.style.left = "4px";
            y.style.right = "-520px";
            a.className += " white-btn";
            b.className = "btn";
            x.style.opacity = 1;
            y.style.opacity = 0;
        } else {

            alert("Please fill in all the fields.");
        }
    }

    function login1(){
            x.style.left = "4px";
            y.style.right = "-520px";
            a.className += " white-btn";
            b.className = "btn";
            x.style.opacity = 1;
            y.style.opacity = 0;
    }
    function register() {
        
                x.style.left = "-510px";
                y.style.right = "5px";
                a.className = "btn";
                b.className += " white-btn";
                x.style.opacity = 0;
                y.style.opacity = 1;
    }
    

    function signIn() {
        var usernameOrEmailInput = document.querySelector('.login-container .input-box input[type="text"]');
        var passwordInput = document.querySelector('.login-container .input-box input[type="password"]');
    
        if (usernameOrEmailInput && passwordInput) {
            var usernameOrEmail = usernameOrEmailInput.value;
            var password = passwordInput.value;
    
            if (usernameOrEmail && password) {
                sessionStorage.setItem('username', usernameOrEmail);
                window.location.href = "home.html";
            } else {
                alert("Please fill out the fields!");
            }
        } else {
            console.error("Error: Input elements not found.");
        }
    }
    
    //logged in logic

    document.addEventListener("DOMContentLoaded", function() {
        var username = sessionStorage.getItem('username');
        var navbarUsernameElement = document.getElementById('navbarUsername');
    
        // Update navbar with the logged-in username
        if (username && navbarUsernameElement) {
            navbarUsernameElement.innerText = "Hi, " + username;
    
            // Create logout dropdown menu
            var logoutDropdown = document.createElement('div');
            logoutDropdown.className = 'logout-dropdown';
            logoutDropdown.innerHTML = '<a href="#">Logout</a>';
    
            // Append logout dropdown to navbarUsernameElement
            navbarUsernameElement.appendChild(logoutDropdown);
    
            // Add event listeners for mouseover and mouseout
            navbarUsernameElement.addEventListener('mouseenter', function() {
                logoutDropdown.style.display = 'block';
            });
    
            navbarUsernameElement.addEventListener('mouseleave', function() {
                logoutDropdown.style.display = 'none';
            });
    
            // Add event listener for logout link
            var logoutLink = logoutDropdown.querySelector('a');
            logoutLink.addEventListener('click', function(event) {
                event.preventDefault();
                // Remove username from sessionStorage
                sessionStorage.removeItem('username');
    
                // Hide the current username
                navbarUsernameElement.innerText = "";
    
                // Hide the "Create" link and show the "Login | Signup" link
                var createLink = document.querySelector('.nav-items a[href="upload.html"]');
                var loginSignupLink = document.createElement('a');
                loginSignupLink.href = "sign.html"; // Add appropriate href
                loginSignupLink.innerHTML = "<h2>Login | Signup</h2>";
    
                if (createLink) {
                    createLink.style.display = "none";
                    createLink.parentElement.insertBefore(loginSignupLink, createLink);
                }
            });
        }
    });
    