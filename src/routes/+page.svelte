<script>

    export let data;

</script>

<main>
    <section class="home-banner">
        <div class="home-banner__text">
            <h1>Welcome, {data.username}</h1>
            <div class="home-banner__btn">
                <div class="logout_btn">
                    <form method="post" action="/login?/logout">
                        <button>Logout</button>
                    </form>
                </div>
                <div class="logout_btn">
                    <a href="#projects"><button>Projects</button></a>
                </div>
            </div>
        </div>
        
    </section>
    <section id="projects" class="projects">
        <h1>Projects</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam deleniti perspiciatis omnis explicabo suscipit hic!</p>
        <a href="/session">Sessions</a>     
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
    .home-banner {
        background: url('./home-banner.jpg');
        background-size: cover;
        background-position: center;

        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .home-banner__text {
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

    .home-banner__btn {
        display: flex;
        gap: 20px;
    }

    .logout_btn button {
        font-size: 22px;
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        background: black;
        color: white;

        width: 200px;

        border-radius: 20px;
        border: 4px solid white;
        padding: 10px;

        transition: all 0.3s ease;
    }

    .logout_btn button:hover {
        background: white;
        color: black;
        border: 4px solid black;
    }

    .projects {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .projects p {
        margin-bottom: 1rem;
    }

    .projects a {
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: black;
        font-size: 18px;
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        background: black;
        color: white;

        width: 150px;

        border-radius: 20px;
        border: 4px solid white;
        padding: 10px;

        transition: all 0.3s ease;
    }

    .projects a:hover {
        background: white;
        color: black;
        border: 4px solid black;
    }

    .projects h1 {
        font-size: 28px;
    }

    footer {
        width: 100%;
        height: 150px;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 50px;
        box-sizing: border-box;
        
        background: #376a7d;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    footer .footer-links a,
    footer h3 {
        color: #9ec5cc;
    }

    footer .footer-links ul {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
</style>