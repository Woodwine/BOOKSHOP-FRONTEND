import React from 'react'

function Rating({ value, reviews, color }) {

    function ratingText(reviews) {
        if (([0, 5, 6, 7, 8, 9].includes(+reviews % 10)) || ([11, 12, 13, 14].includes(+reviews % 100))) {
            return `${reviews} отзывов`;
        } else if ([2, 3, 4].includes(+reviews % 10)) {
            return `${reviews} отзыва`;
        } else if ((+reviews % 10) === 1) {
            return `${reviews} отзыв`;
        }
    };

    let text = ratingText(reviews)

    return (
        <div className='rating'>
            <span>
                <i style={{ color }} className={
                    value >= 1
                        ? 'fas fa-star'
                        : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }></i>

                <i style={{ color }} className={
                    value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }></i>

                <i style={{ color }} className={
                    value >= 3
                        ? 'fas fa-star'
                        : value >= 2.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }></i>

                <i style={{ color }} className={
                    value >= 4
                        ? 'fas fa-star'
                        : value >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }></i>

                <i style={{ color }} className={
                    value >= 5
                        ? 'fas fa-star'
                        : value >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }></i>
            </span>

            <span className='px-3'>{text && text}</span>
        </div>
    )
}

export default Rating
