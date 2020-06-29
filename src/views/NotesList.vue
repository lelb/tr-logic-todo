<template>
    <div>
        <div class="notes-list flex flex-ai-stretch">
            <note-item v-for="(note, index) in notesList"
                       :key="index"
                       :note="note"
                       :index="index"
                       @delete="deleteNote(note.id)"
            ></note-item>
        </div>
        <router-link :to="{name: 'create-note'}" class="btn btn-blue create_note_link" title="Create todo">+</router-link>
        <confirmation :confirmation="noteDeleteConfirmation"
                      :dialogText="`Are you sure to delete note #${noteDeleteId} with todos`"
                      @confirm="deleteNoteConfirm(noteDeleteId)"
                      @cancel="cancelDeleteTodo"></confirmation>
    </div>
</template>

<script>
	// @ is an alias to /src
	import Confirmation from '@/components/Confirmation'
	import NoteItem from '@/components/NoteItem'

	export default {
		name: 'notes-list',
		components: {Confirmation, NoteItem},
		data() {
			return {
				noteDeleteConfirmation: false,
				noteDeleteId: ''
			}
		},
		computed: {
			notesList() {
				return this.$store.state.notesList
			}
		},
		methods: {
			deleteNote(id) {
				this.noteDeleteConfirmation = true
				this.noteDeleteId = id
			},
			deleteNoteConfirm(id) {
				this.noteDeleteConfirmation = false
				this.noteDeleteId = ''
				this.$store.commit('deleteNote', id)
			},
			cancelDeleteTodo() {
				this.noteDeleteConfirmation = false
				this.noteDeleteId = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
    .create_note_link {
        position: fixed;
        bottom: 30px;
        right: 30px;
        border-radius: 50%;
        line-height: 50px;
        width: 50px;
        height: 50px;
        padding: 0;
        font-size: 25px;
        &:focus {
            outline: none;
            box-shadow: 0 0 10px 0 rgba(#000,.2);
        }
    }
</style>
