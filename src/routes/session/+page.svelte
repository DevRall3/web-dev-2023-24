<script>
    import { enhance } from "$app/forms";

    export let data;
</script>

<main>
    <section class="banner">
        <div class="banner-text">
            <h1>Welcome To Sessions</h1>
            <div class="banner_btn">
                <a href="/"
                    ><button class="back_btn"
                        >Go Back, <span>or Scroll Down :)</span></button
                    ></a
                >
                <a href="#create"
                    ><button class="back_btn">Create A Session</button></a
                >
            </div>
        </div>
    </section>
    <section id="create" class="session">
        <div class="sessions">
            <h1>Create A Session</h1>
        </div>

        <form action="?/create" method="post" use:enhance>
            <input
                type="text"
                name="sessionName"
                placeholder="Enter session name.."
            />
            <button>Create</button>
        </form>

        <h3>Active Session</h3>

        <div class="active-sessions">
            {#each data.sessions as session}
            <div class="session-details">
                <a href="/session/{session.name}">{session.name}</a>
                <hr>
                <p>Created by: {session.createdBy}</p>
                <p>Number of Messages: {session.messages.length}</p>
                <!-- Add any additional information you want to display -->
            </div>
                {/each}
        </div>
    </section>
    <footer>
        <h3>Made by Rasmus</h3>
        <div class="footer-links">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/#projects">Projects</a></li>
            </ul>
        </div>
    </footer>
</main>

<style>
    .banner {
        background: url("./session-banner.jpg");
        background-size: cover;
        background-position: center;

        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .banner-text {
        display: flex;
        flex-direction: column;
        align-items: center;

        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        backdrop-filter: blur(15px);

        color: white;
        font-size: 46px;

        padding: 50px;
    }

    .back_btn {
        font-size: 22px;
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        background: #7b3470;
        color: white;

        width: 250px;

        border-radius: 20px;
        border: 4px solid white;
        padding: 10px;

        transition: all 0.3s ease;
    }

    .back_btn:hover {
        background: white;
        color: #7b3470;
        border: 4px solid #7b3470;
    }

    .back_btn span {
        font-size: 12px;
    }

    .banner_btn {
        display: flex;
        gap: 20px;
    }

    .session {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        text-align: center;
    }

    .session a {
        text-decoration: none;
        color: black;
    }

    .active-sessions {
        display: flex;
        flex-wrap: wrap;

        width: 80vw;
    }

    .session-details {
        margin: 10px 10px;
        background-color: black;
        border: 5px solid white;
        color: white;
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 150px;
    }

    .session a {
        margin-top: 5px;
        color: white;
        font-weight: bold;
        text-transform: uppercase;
    }


    .session hr {
        margin: 5px 0;
    }
    
    form {
        margin-top: 1rem;
    }

    .session input,
    .session button {
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        background: black;
        color: white;

        border-radius: 15px;
        border: 4px solid white;
        padding: 15px;
        margin-bottom: 1rem;

        transition: all 0.3s ease;
    }

    .session input::placeholder {
        color: white;
    }

    .session input:focus::placeholder {
        color: black;
    }

    .session input:focus,
    .session button:hover {
        background: white;
        color: black;
        border: 4px solid black;
    }

    .session h1 {
        font-size: 28px;
    }

    .session h3 {
        margin-bottom: 0.4rem;
        font-size: 28px;
    }

    .activeSessions {
        margin: 10px;
    }

    footer {
        width: 100%;
        height: 150px;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 50px;
        box-sizing: border-box;

        background: #a31962;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    footer .footer-links a,
    footer h3 {
        color: #fdaec1;
    }

    footer .footer-links ul {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
</style>
