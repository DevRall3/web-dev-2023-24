<script lang="ts">
    import { enhance } from "$app/forms";
    export let form;
    export let data;

</script>

<main>
    <!-- Loginpage -->
    <div class="login-form">
        <h1>Log In</h1>
        <p>
            'There is no registration'
        </p>
        <div class="chose-username">
            <form method="post" action="?/login" use:enhance>
                <input type="text" name="username" placeholder="Enter Username..">
                <input type="password" name="password" placeholder="Enter Password..">
                <button>Login</button>
                {#if form?.username}
                    <span style="color:red;">{form.username}</span>
                {/if}
                {#if form?.password}
                    <span style="color:red;">{form.password}</span>
                {/if}
            </form>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100vh;
        
        background: url('./login-banner.jpg');
        background-position: center;
        background-size: cover;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        backdrop-filter: blur(15px);

        padding: 25px;
        width: 25vw;
    }

    .login-form h1 {
        color: white;
        font-weight: 800;
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .login-form p {
        margin: 0;
        color: white;
        margin-bottom: 1rem;
    }

    .login-form input {
        width: 200px;
    }

    .login-form button {
        width: 80px;
    }

    .login-form input,
    .login-form button {
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        background: black;
        color: white;

        border-radius: 15px;
        border: 4px solid white;
        padding: 15px;
        margin-bottom: 1rem;

        transition: all 0.3s ease; 
    }

    .login-form button {
        font-weight: bold;
    }

    .login-form input::placeholder {
        color: white;
    }

    .login-form input:focus::placeholder {
        color: black;
    }


    .login-form input:focus,
    .login-form button:hover {
        background: white;
        color: black;
        border: 4px solid black;
    }

    form {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;
    }
</style>

