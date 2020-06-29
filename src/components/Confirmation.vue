<template>
    <transition name="appear">
        <div class="modal" v-if="confirmation">
            <div class="modal-window pad10-rl pad20-tb">
                <p class="mar10-b" v-if="dialogText.length !== 0">{{dialogText}}</p>
                <div class="flex flex-jc-end">
                    <button class="btn btn-red" @click="onCancel">Cancel</button>
                    <button class="btn btn-blue mar10-l" @click="onConfirm">Confirm</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
	export default {
		name: 'confirmation',
		props: {
			confirmation: {
				type: Boolean,
				required: true
			},
			dialogText: {
				type: String,
				required: false
			}
		},
		data() {
			return {

			}
		},
		methods: {
			onConfirm() {
				this.$emit("confirm");
			},
			onCancel() {
				this.$emit("cancel");
			}
		}
	}

</script>
<style lang="scss" scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .5);
    }

    .modal-window {
        position: absolute;
        top: 50%;
        left: 50%;
        transition: .5s;
        width: 100%;
        max-width: 600px;
        background: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        transform: translate(-50%, -50%);
        color: black;
        text-align: center;
    }

    .appear-enter {
        opacity: 0;
    }

    .appear-enter .modal-window {
        transform: translate(-75%, -50%);
    }

    .appear-enter-active {
        transition: .5s;
    }

    .appear-leave-active .modal-window {
        transform: translate(0, -50%);
    }

    .appear-leave-active {
        opacity: 0;
        transition: .5s;
    }
</style>