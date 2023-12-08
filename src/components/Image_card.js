import React from 'react'

const Image_card = ({data,type}) => {
    console.log("dataart",data['date']);
    let contenttype = '';
    if(type == "art"){
        contenttype = 'art_image';
    }else if(type == "event"){
        contenttype = 'event_image';
    }else if(type == "education"){
        contenttype = 'education_image';
    }
  return (
    <div className="product-card">
    {/* <div className="badge">Hot</div> */}
    <div className="product-tumb">
    <img src={`data:image/jpeg;base64,${data['data'][contenttype]}`} />
        {/* <img src="https://i.imgur.com/xdbHo4E.png" alt=""/> */}
    </div>
    <div className="product-details">
        <span className="product-catagory">{data['title']}</span>
        {type == "event" &&
        <h4><a href="">{data['data']['event_date']}</a></h4>
        }
        <p>{data['description']}</p>
        {/* <div className="product-bottom-details">
            <div className="product-price"><small>$96.00</small>$230.99</div>
            <div className="product-links">
                <a href=""><i className="fa fa-heart"></i></a>
                <a href=""><i className="fa fa-shopping-cart"></i></a>
            </div>
        </div> */}
    </div>
</div>
  )
}

export default Image_card