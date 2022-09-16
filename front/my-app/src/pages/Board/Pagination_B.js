import React, {useEffect, useState} from 'react'


const pagesPerList = 5;

//showingNum = number

function Pagination_B({postsPerPage, totalPosts, currentPage, setCurrentPage, paginate, totalPage}){
    const [number, setNumber ]= useState({
        start:1,
        end: pagesPerList,
    });

    const arrowHandler = (prev, sign, totalPage) => {
        const pagesPerList = 5;
        const nextIndex = prev.end + pagesPerList;
        let res;
        if (sign === 1) {
            res = nextIndex > totalPage ? totalPage : nextIndex;
        } else if (sign === -1) {
            res =
                prev.end - prev.start < 4
                    ? prev.start + 4 - pagesPerList
                    : prev.end - pagesPerList;
        }
        return { ...prev, start: prev.start + pagesPerList * sign, end: res };
    };

    const changePageNumbersBackward = () => {
        console.log(currentPage)
        currentPage > pagesPerList &&
        setNumber(prev => arrowHandler(prev, -1, totalPage));
    };


    const changePageNumberForward = () => {
        console.log(currentPage)
        number.end <= totalPage &&
        setNumber(prev => arrowHandler(prev, 1, totalPage));
    };



    useEffect(() => {
        const lessThanFive = totalPage <= pagesPerList;
        lessThanFive
            ? setNumber(prev => ({ ...prev, start: 1, end: totalPage }))
            : setNumber(prev => ({ ...prev, start: 1, end: pagesPerList }));
    }, [totalPage]);



    useEffect(() => {
        setCurrentPage(number.start);
    }, [number, setCurrentPage]);



    const pageNumbers = [];


    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
            <div className="page-item">
                <button className="page-link"
                    type="back"

                    changePageNumbersBackward={changePageNumbersBackward}> &lt;</button>
            </div>

                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link" style={currentPage == number ? {color: '#17a2b8'} : null}>
                            {number}
                        </a>

                    </li>
                ))}
                <div className="page-item">
                    <button className="page-link"
                            type="next"

                            changePageNumbersBackward={changePageNumberForward}> &gt;</button>
                </div>
            </ul>
        </nav>

    );
}


export default Pagination_B;