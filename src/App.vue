<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

	export default {
		created() {
			this.$store.commit('notesCreate')
		}
	}

</script>

<style lang="scss">

    *, ::before, ::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    ul {
        list-style-position: inside;
    }

    .checkbox {
        input {
            display: none;

            &:checked {
                + label {
                    border-color: #002f3b;

                    &:after {
                        transform: rotate(-45deg);
                        opacity: 1;
                    }
                }
            }
        }

        label {
            display: block;
            width: 20px;
            height: 20px;
            border: 1px solid #d6d9dc;
            border-radius: 2px;
            position: relative;
            cursor: pointer;
            transition: .3s all;
            background: #fff;

            &:hover {
                border-color: #002f3b;
            }

            &:after {
                display: block;
                content: '';
                position: absolute;
                left: 3px;
                top: 4px;
                opacity: 0;
                width: 12px;
                height: 6px;
                border: 1px solid #002f3b;
                box-sizing: border-box;
                border-top: none;
                border-right: none;
                transition: .3s all;
            }
        }
    }

    input[type=text] {
        border-radius: 2px;
        padding: 10px;
        height: 36px;
        line-height: 16px;
        border: 1px solid #999;
        outline: none;
        font: inherit;
        &:focus {
            border-color: #5a5;
        }
    }

    .btn {
        display: inline-block;
        border: none;
        padding: 10px;
        line-height: 16px;
        margin: 0;
        text-decoration: none;
        color: #ffffff;
        font-family: sans-serif;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out,
        transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    .btn-blue {
        background: #0069ed;

        &:hover,
        &:focus {
            background: #0053ba;
        }
    }

    .btn-red {
        background: #ed0f00;

        &:hover,
        &:focus {
            background: #ba0e00;
        }
    }

    .btn:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }

    .btn:active {
        transform: scale(0.99);
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        overflow: hidden;
        font-size: 15px;
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        > * {
            min-width: 0;
        }
    }

    .flex-nowrap {
        flex-wrap: nowrap;
    }

    .flex-shrink0 {
        flex-shrink: 0;
    }

    .flex-grow1 {
        flex-grow: 1;
    }

    .flex-jc-end {
        justify-content: flex-end;
    }

    .flex-ai-center {
        align-items: center;
    }

    .flex-ai-stretch {
        align-items: stretch;
    }

    .w33 {
        width: 33.33%;
    }

    .w66 {
        width: 66.66%;
    }

    .w50 {
        width: 50%;
    }

    .w100 {
        width: 100%;
    }

    .pad10 {
        padding: 10px;
    }

    .pad10-r {
        padding-right: 10px;
    }

    .pad10-rl {
        padding-right: 10px;
        padding-left: 10px;
    }

    .pad20-rl {
        padding-right: 20px;
        padding-left: 20px;
    }

    .pad20-tb {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .mar10-t {
        margin-top: 10px;
    }

    .mar10-b {
        margin-bottom: 10px;
    }

    .mar20-b {
        margin-bottom: 20px;
    }

    .mar10-tb {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .mar10-l {
        margin-left: 10px;
    }
    .mar10-r {
        margin-right: 10px;
    }
    .mar-auto-t {
        margin-top: auto;
    }

    .t-clip {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
