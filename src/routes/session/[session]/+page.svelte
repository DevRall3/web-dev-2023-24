<script lang="ts">
    import { browser } from "$app/environment";
    import { invalidateAll } from "$app/navigation";
    import { onDestroy } from "svelte";
    import type { PageData } from "./$types";
    import { enhance } from "$app/forms";

    export let data: PageData;

    $: reversedMessages = [...data.messages].reverse()

    let imgArr = ['../../chat'];

    if (browser) {
        let interval = setInterval(invalidateAll, 500);

        onDestroy(() => {
            clearInterval(interval);
        });
    }
</script>

<main>
    <div class="go-back">
        <a href="/session"><button>Back</button></a>
    </div>
    <section class="chat">
        <div class="messages">
            {#each reversedMessages as message}
                <span
                    class="msg"
                    class:myMessage={message.user == data.user}
                    class:otherMessage={message.user != data.user}
                    id="{message.user == data.user ? "myMessage" : "otherMessage"}"
                >
                    {message.text}
                </span>
                <span 
                    class="sentBy"
                    id="{message.user == data.user ? "myMessage" : "otherMessage"}"
                >
                    {#if message.user == data.user}
                        You
                    {:else}
                        {message.user}
                    {/if}
                </span>
            {/each}
        </div>
        <div class="send">
            <form action="?/message" method="post" use:enhance>
                <input type="text" name="message" />
                <button>Send</button>
            </form>
        </div>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        background: url('../../chat-bg-1.jpg');
        background-position: center;
        background-size: cover;

        height: 100vh;
    }

    .go-back {
        position: absolute;
        top: 0;
        left: 0;
        margin: 10px;
    }

    .go-back button {
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        background: black;
        color: white;

        border-radius: 15px;
        border: 4px solid white;
        padding: 5px 20px;
        margin-bottom: 1rem;

        transition: all 0.3s ease;  
    }

    .go-back button:hover {
        background: white;
        color: black;
        border: 4px solid black;
    }

    .chat {
        height: 80vh;
        width: 45vw;
        position: relative;
        display: flex;
        justify-content: center;

        border-radius: 15px;
        backdrop-filter: blur(15px);
        box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, 0.5);
    }

    #myMessage {
        border-bottom-right-radius: 2px;
        align-self: flex-end;
    }
    #otherMessage {
        border-bottom-left-radius: 2px;
        align-self: flex-start;
        background: rgb(76, 76, 76);
    }

    .sentBy {
        background-color: transparent !important;
        font-weight: bold;
    }


    .messages {
        position: relative;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        text-align: left;

        overflow-y: scroll;

        max-height: 76%;
        width: 454px;
        margin: 1rem 0;
        padding: 0 10px;
        gap: 1rem;
    }

    .messages .msg {
        color: white;
        padding: 10px 20px;
        background: black;
        border-radius: 10px;
        max-width: 65%;
    }

    .send {    
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;

        bottom: 0;
    }

    .send form {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-top: 10px;
        gap: 10px;
    }

    .send input,
    .send button {
        box-shadow: 2px 3px 10px 4px rgba(0, 0, 0, 0.5);
        background: black;
        color: white;

        border-radius: 15px;
        border: 4px solid white;
        padding: 15px;
        margin-bottom: 1rem;

        transition: all 0.3s ease;
    }

    .send input {
        width: 350px;
    }

    .send input:focus,
    .send button:hover {
        background: white;
        color: black;
        border: 4px solid black;
    }


::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
