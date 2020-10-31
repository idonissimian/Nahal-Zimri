import { storage, db,auth } from '../../config/Firebase'
import ImagePicker from 'react-native-image-crop-picker';




uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }

  uploadToFirebase = (blob,location) => {
    return new Promise((resolve, reject)=>{
      var storageRef = storage.ref();
      storageRef.child(location).put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  uploadMultImages = (location) => { console.log("start");

  ImagePicker.openPicker({
        multiple: false,
        cropping: true,
    }).then((result)=>{ 
      
      if (!result.cancelled) {
        // User picked an image
        
        return uriToBlob(result.path)

      }
      else
           console.log("\n\nCanceled\n\n");

    }).then((blob)=>{

      return uploadToFirebase(blob,location);

    }).then((snapshot)=>{

      console.log("File uploaded " + snapshot);
   
    }).catch((error)=>{
      console.log("\n\nCanceled\n\n");


    }); 

  }

  export default uploadMultImages;