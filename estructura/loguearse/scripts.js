document.addEventListener("DOMContentLoaded", () => {
	const loginURL = "./login.php";
	const logoutURL = "./logout.php";
	const sessionCheckURL = "../session_status.php";

	const form = document.getElementById("login-form");

	// hacer un fetch para checkear en caso de estar logueado o no
	const checkSession = (ifLogged = () => {}, ifLogout = () => {}) => {
		fetch(sessionCheckURL)
			.then((r) => r.json())
			.then((data) => {
				// si está logueado ocultar el formulario y mostrar el boton
				if (data.status == "logged_in") {
					delete data["status"];
					ifLogged(data);
				}

				// en caso de estar deslogueado mostrar el formulario y conectar los eventos
				if (data.status == "logged_out") return ifLogout();
			});
	};

	const listenForm = () => {
		document.getElementById("login-form-container").style.display = "flex";
		form.addEventListener("submit", (event) => {
			event.preventDefault();

			const inputCorreo = document.getElementById("correo-input");
			const inputPassword = document.getElementById("pass-input");
			if (!inputCorreo.value || !inputPassword.value)
				return alert("Por favor, complete todos los campos.");
            
            console.log(inputCorreo.value, inputPassword.value)

			fetch(loginURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `_c=${encodeURIComponent(inputCorreo.value)}&_p=${encodeURIComponent(inputPassword.value)}`,
			})
				.then((r) => r.json())
				.then((data) =>
					data.status === "success"
						? (window.location.href = "./index.html")
						: alert(data.message),
				)
				.catch((error) => {
					console.log(error);
				});
		});
	};

	// Ocultar el formulario en caso de ya estar logueado
	const hideLogin = (userData) => {
		document.getElementById("login-form-container").style.display = "none";
		document.getElementById("login-user-container").style.display = "flex";		
		
		document.getElementById("login-user-label").innerText =
			`Actualmente logueado como ${userData?.nombre}`;
		document.getElementById("logout-button").addEventListener("click", () => {
			fetch(logoutURL)
				.then((r) => r.json())
				.then(() => checkSession(null, () => location.reload()))
				.catch((error) => console.log(error));
		});
	};

	checkSession(hideLogin, listenForm);
	document.getElementById("login-form-container").style.display = "flex";
});
