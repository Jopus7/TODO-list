function TaskShowUp({tasks}) {
    return(
        <p>{tasks.filter((e) => !e.status).length}items left</p>
    )
}
export default TaskShowUp