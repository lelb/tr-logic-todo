<template>
    <div class="w33 pad10 flex flex-ai-stretch">
        <transition name="note">
            <div class="notes-item pad10 flex w100">
                <div class="w33 pad10-r">
                    <span class="note-id">#{{note.id}}</span>
                    <h3 class="note-name">{{note.name}}</h3>
                </div>
                <ul class="notes-todos-prev w66">
                    <li class="t-clip" v-for="(todo, index) in note.todos" :key="index">
                        <strike v-if="todo.completed">{{todo.description}}</strike>
                        <template v-else>{{todo.description}}</template>
                    </li>
                </ul>
                <div class="flex mar-auto-t">
                    <button class="btn btn-red mar10-t" @click="$emit('delete')">Delete</button>
                    <router-link :to="{name: 'change-note', params: {id:note.id}}"
                                 class="btn btn-blue mar10-t mar10-l">Change
                    </router-link>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
	export default {
		name: 'note-item',
		props: {
			note: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true,
			},
		},
		data() {
			return {}
		},
		methods: {}
	}

</script>
<style lang="scss" scoped>
    .notes-item {
        box-shadow: 0 0 10px -3px rgba(#111, .3);
        border-radius: 3px;
        position: relative;

        &:hover {
            .notes-todos-prev:after {
                width: 0;
            }
        }
    }

    .notes-todos-prev:after {
        display: block;
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 30%;
        background: linear-gradient(to right, rgba(#fff, 0) 0%, #fff 100%);
        transition: .3s all;
    }

    .note-id {
        font-size: 10px;
    }

    .note-enter {
        opacity: 0;
    }

    .note-enter .notes-item {
        transform: translate(0, -50%);
    }

    .note-enter-active {
        transition: .5s;
    }

    .note-leave-active .notes-item {
        transform: translate(0, 0);
    }

    .note-leave-active {
        opacity: 0;
        transition: .5s;
    }
</style>