import { useEffect } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCards, likeCard, unlikeCard, deleteCard } from './redux/CardList'
import { FaRegHeart } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';


// здесь функицонал лайков, фильтр

function Cards() {

    const cardlist = useSelector((state) => state.cardList.posts[0])
    const dispatch = useDispatch()

    const postStatus = useSelector(state => state.cardList.status)
    const error = useSelector(state => state.cardList.error)

    const likedCards = useSelector((state) => state.cardList.likedCards)

    useEffect(() => {
      if (postStatus === 'idle') {
        dispatch(fetchCards())
      }
    }, [postStatus, dispatch])



    const handleClickLike = (e) => {
      const likeIcon = e.target.closest('.like-icon');
      likeIcon.closest('.card-item').classList.toggle('checked');
      const parentBlock = e.target.closest('.card-item')
      // данные с карточки в объект
      const cardId = parentBlock.getAttribute('id')

      const cardsObj = {
        id: parseInt(cardId)
      };

      dispatch(likeCard(cardsObj))

      if(!likeIcon.closest('.card-item').classList.contains('checked')) {
        dispatch(unlikeCard())
        
      }

    }

    const handleFilterLikeClick = () => {
      // вывод лайкнутых карточек
      const cardBlock = document.querySelector('.cards-block').children;
      const filterBtn = document.querySelector('.filter-btn button');
      for(let el of cardBlock) {
          const cardId = el.getAttribute('id');
          likedCards.map(item => {
              if(parseInt(cardId) === item.id) {
                el.classList.add('show')
              }
              if(el.classList.contains('checked')) {
                el.style.display = 'block'
              } else {
                el.style.display = 'none';
              }
             
          });
      }

    }

    const handleFilterLikeUnclick = () => {
      const cardBlock = document.querySelector('.cards-block').children;
      console.log(likedCards);
      
      for(let el of cardBlock) {
        el.style.display = 'block'
      }

    }

    const handleClickDelete = (e) => {
        const delBtn = e.target;
        const cardId = delBtn.closest('.card-item').getAttribute('id');
        delBtn.closest('.card-item').remove();
        cardlist.recenttracks.track.map((item, index) => {
            if(parseInt(cardId) === index) {
                const deletedItems = {};
                deletedItems[index] = item;
                dispatch(deleteCard(deletedItems))
            }
        })
    }




    if(postStatus === 'loading') {
      return <div>Загрузка...</div>
    } else {
      return(
        <div>
          <div className="filter-btn"><button onMouseDown={handleFilterLikeClick} onMouseUp={handleFilterLikeUnclick}>Фильтр</button></div>
            <div className="cards-block">
                  {
                    cardlist.recenttracks.track.map((item, index) => (
                      <div key={index} id={index} className="card-item">
                        <div className="like-icon"><FaRegHeart onClick={handleClickLike}/></div>
                        <p><img src={item.image[2]['#text']} alt="" /></p>
                        <h4>Artist: {item.artist['#text']}</h4>
                        <p>Song name: {item.name}</p>
                        <p>Album name: {item.album['#text']}</p>
                        <div className="delete-icon"><FaTrashAlt onClick={handleClickDelete}/></div>
                      </div>
                    ))
                  }

            </div>

        </div>
        )
    }

        }


export default Cards
