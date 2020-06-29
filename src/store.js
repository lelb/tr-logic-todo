import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		notesList: [],
		notesChangesBuffer: []
	},
	mutations: {
		deleteNote(state, id) {
			const index = state.notesList.findIndex(item => item.id === id);
			state.notesList.splice(index, 1);
		},
		saveNote(state, note) {
			const index = state.notesList.findIndex(item => item.id === note.id)
			state.notesList[index].todos = note.todos
		},
		createNote(state, note) {
			state.notesList.push(note)
		},
		refreshChanges(state) {
			state.notesChangesBuffer.splice(1, state.notesChangesBuffer.length)
		},
		addInBuffer(state, params) {
			if (params.bufferCurrentIndex === state.notesChangesBuffer.length - 1) {
				state.notesChangesBuffer.push(params.note)
			} else {
				state.notesChangesBuffer.splice(params.bufferCurrentIndex + 1, state.notesChangesBuffer.length)
				state.notesChangesBuffer.push(params.note)
			}
		},
		notesCreate(state) { //will be changed by retrieveNotes from server API
			if (state.notesList.length !== 0) return false
			let noteItemsCount = 5
			for (let i = 1; i <= noteItemsCount; i++) {
				state.notesList.push({
					id: i,
					name: 'Name ' + i,
					todos: [
						{
							description: 'description',
							completed: true
						},
						{
							description: 'descriptiondescriptiondescriptiondescriptiondescription',
							completed: false
						},
						{
							description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
							completed: false
						},
						{
							description: 'descriptiondescriptiondescriptiondescriptiondescription ',
							completed: false
						},
					]
				})
			}
		}
	},
	actions: {}
})
