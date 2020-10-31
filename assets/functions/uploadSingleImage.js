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

  uploadImage = (location) => { console.log("start");

  return ImagePicker.openPicker({
        multiple: false,
        cropping: true,
        compressImageQuality: 0.7,
        mediaType: "photo"
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

      console.log("File uploaded ");
      // storage.ref().child(location).getDownloadURL().then( (url) => {
      //   db.ref(DB_Path+"/imageLink").set(url)
  // })
   
    }).catch((error)=>{
      console.log("\n\nCanceled: "+error+"\n\n");
      return -1;

    }); 

  }

  export default uploadImage;