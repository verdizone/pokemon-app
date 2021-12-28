const Pagination = ( {gotoNextPage, gotoPrevPage} ) => {
    return (
        <div>
            {
            gotoPrevPage &&
            <button
              onClick={gotoPrevPage}
            >
                Página anterior
            </button>
            }

            {
            gotoNextPage &&
            <button
              onClick={gotoNextPage}
            >
                Página siguiente
            </button>
            }

        </div>
    )
}

export default Pagination
