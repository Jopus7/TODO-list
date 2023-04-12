
function FilterButtons(){
    return(
        <div>
            <button onClick={() => setSelection('all')}>All</button>
            <button onClick={() => setSelection(false)}>Active</button>
            <button onClick={() => setSelection(true)}>Completed</button>
        </div>
    )
}
export default FilterButtons