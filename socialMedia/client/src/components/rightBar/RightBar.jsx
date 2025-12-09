import './rightBar.scss'

function RightBar() {
  const friendsImg ="https://cdn.pixabay.com/photo/2022/12/07/02/58/ai-generated-7640108_1280.jpg"
  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>

        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <p>
                <span>Jane Doe</span> changed their cover
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <p>
                <span>Jane Doe</span> changed their cover
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <p>
                <span>Jane Doe</span> changed their cover
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <p>
                <span>Jane Doe</span> changed their cover
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={friendsImg} alt="" />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RightBar