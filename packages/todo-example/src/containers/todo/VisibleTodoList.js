import { connect } from "react-redux";
import { toggleTodo } from "../../modules/todo/actions";
import TodoList from "../../components/todo/TodoList";
import { VisibilityFilters } from "../../modules/todo/actions";

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error("Unknown filter: " + filter);
    }
};

const mapStateToProps = state => {
    if (state.todo) {
        return {
            todos: getVisibleTodos(
                state.todo.todos,
                state.todo.visibilityFilter
            ),
        };
    } else {
        return {
            todos: [],
        };
    }
};

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
