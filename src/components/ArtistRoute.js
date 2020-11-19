import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { generatePath, useParams } from "react-router-dom";
import {fetchArtistProfile} from "../helpers/api-helpers";
import { useDispatch } from 'react-redux';
import { requestArtistProfile , receiveArtistProfile , receiveArtistProfileError } from '../actions';

const ArtistRoute = () => {
    const accessToken = useSelector((state) => state.auth.token);
    const artistProfile = useSelector((state) => state.artists.currentArtist);
    
    let artistProfileStatus =  useSelector((state) => state.artists.status);


    const dispatch = useDispatch();


    
    
    


    let { id } = useParams();



    // Run an effect whenever `aDependentValue` changes.
    // ⚠️ Notice the "dependencies array" is [aDependentValue]
    React.useEffect(() => {
        // If we don't have that value, do nothing
        if (!accessToken) {
        return;
        }

        dispatch(requestArtistProfile());

        async function artistInfo() {
            const info = await fetchArtistProfile(accessToken, id );


            if(!info.name){
                dispatch(receiveArtistProfileError());
            }
            else{
                dispatch(receiveArtistProfile(info));
                // artist = useSelector((state) => console.log("here is the state", state));
            }

         }
         
         artistInfo();

        
        
    }, [accessToken]);


    //based from https://playfairdata.com/how-to-dynamically-change-number-units-between-k-m-b-in-tableau/
    const convertBMK = (value) => {
        if(value >= 1000000000){
            return `${(value / 1000000000).toFixed(1)}B`;
        }
        else if(value >= 1000000){
            return `${(value / 1000000).toFixed(1)}M`;
        }
        else if(value >= 1000){
            return `${(value / 1000).toFixed(1)}K`;
        }
        else{
            return value;
        }
    }


    return (

        <Wrapper>

            {artistProfile && (
            <>
                <img src={artistProfile.images[0].url} />
                <div className="name">{artistProfile.name} </div>
                <div className="followers"><span>{convertBMK(artistProfile.followers.total)}</span> followers</div>
                <div className="tags">Tags</div>
                <div className="genre_list">
                {
                    artistProfile.genres.slice(0, 2).map((genre) => (

                     <div className="genre" key={artistProfile.genres.indexOf(genre)+1} style={{margin: "0 4px 0 4px"}}>{genre}</div>

                    ))

                }
                </div>
                {/* <div>{} followers</div> */}
                
                
            </>
            )}

            

        </Wrapper>
    )   

};
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height: 100vh;

    background-color: #2c2c2c;
    color: #fff;

    text-align: center;
    

    img {
        width: 160px;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 40px;
    }

    .name{
        font-weight: bold;
        text-align: center;
        font-size: 49px;
        margin-top: -57px;
    }

    .tags {
        margin-top: 30px;
        font-weight: bold;
    }

    .followers{
        font-weight: bold;
        margin-top: 17px;
    }

    .followers span{
        font-weight: bold;
        color: pink;
    }

    .genre_list{
        display: flex;
        flex-direction: row;
        margin: auto;
        margin-top: 25px;
    }

    .genre{
        background-color: #403d3d;
        width: 130px;
        padding: 4px 0 4px 0;
        border-radius: 6px;
    }

    @media screen and (max-width: 600px) {
        background-color: #2c2c2c;
        color: #fff;


    }    
`;

export default ArtistRoute;