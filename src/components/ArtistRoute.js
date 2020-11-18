import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {fetchArtistProfile} from "../helpers/api-helpers";
import { useDispatch } from 'react-redux';
import { requestArtistProfile , receiveArtistProfile , receiveArtistProfileError } from '../actions';

const ArtistRoute = () => {
    const accessToken = useSelector((state) => state.auth.token);
    const artistProfile = useSelector((state) => state.artists.currentArtist);
    
    let artistProfileStatus =  useSelector((state) => state.artists.status);


    const dispatch = useDispatch();



    
    


    let { id } = useParams();

    console.log("artist id", id);

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

            console.log(info);

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


    if(artistProfileStatus == "idle"){
        console.log("artisProfile", artistProfile);
    }
    return (

        <Wrapper>

            ArtistRoute Called

            token: {accessToken}

            {artistProfile && (
                
                <p>name: {JSON.stringify(artistProfile)} </p>

            )}

            

        </Wrapper>
    )   

};
const Wrapper = styled.div`

`;

export default ArtistRoute;