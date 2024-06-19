

'use client'
import * as THREE from "three";
import React, { useEffect, } from "react";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import { useScroll, useGLTF, Plane } from "@react-three/drei";
import { EffectComposer, Bloom,  BrightnessContrast, HueSaturation, ToneMapping } from '@react-three/postprocessing'
import {  ToneMappingMode } from 'postprocessing'

//authoring environment
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import ProjectState from "/app/lib/NFTFrameBasicTest.json";

let sheet;


if(process.env.NEXT_PUBLIC_NODE_ENV === "development") {
  studio.initialize();
 studio.extend(extension);
 }


 if(process.env.NEXT_PUBLIC_NODE_ENV === "development") {
  sheet = getProject("Demo Project").sheet("Demo Sheet");
 // console.log("Proj", getProject("Demo Project"));
}
else {
  sheet = getProject('Demo Project', { state: ProjectState }).sheet('Demo Sheet');
}



//  import projectState from '/app/lib/NFTFrameBasicTest.json'





export default function NFTFrame(props) {


    const mediaName = props.mediaName;
    const mediaType = props.mediaType ? props.mediaType : null;
    let frameType = props.frameType ? props.frameType : "frame-simple";
   
    frameType = frameType + "-" + "1x1" + ".glb";


    

    
    useEffect(() => {
      sheet.project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity, range: [0, 5] }))
    }, [])

  return (
 
          <Canvas id="nftCanvas" gl={{ preserveDrawingBuffer: true }} >
            <SheetProvider sheet={sheet}>
              <Scene mediaName={mediaName} mediaType={mediaType} frameType={frameType}/>
            </SheetProvider>
          </Canvas>

  );
}



function Scene(props) {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const textures = { none: null };
  const aspectRatio = props.aspectRatio ? props.aspectRatio : "16x9";
  let playPos = "";




  const scripts = sheet.object('Scripts', {
    playPos: "go",
  })

  scripts.onValuesChange((obj) => { 
    playPos = obj.playPos;
    if(playPos === "loop"){
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 5] });

    }
  });

  const scene = useGLTF(props.frameType);

  //listen for a click on the content-layer and then call the mainpulateModel function
  document.getElementById("closeModal").addEventListener("click", function () {
    mainpulateModel(scene, aspectRatio, playPos);
  });



  // pass object, filename and whether you want to override the type (eg video, image)
  injectToMesh(scene, props.mediaName, "Middle", props.mediaType);
  return (
    <>
    
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[5, 5, -5]}
        fov={75}
      />
      <ambientLight />
       <e.spotLight
               position={[-3, 0.4, 0.04]}
            angle={0.15}
            penumbra={1}
            theatreKey="directionalLight4"
            map={new THREE.TextureLoader().load("newfoil2.png")}
          />
             <e.spotLight
               position={[-3, 0.4, 0.04]}
            angle={0.15}
            penumbra={1}
            theatreKey="directionalLight3"
            map={new THREE.TextureLoader().load("newfoil2.png")}
            
          />
         <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
         <e.mesh theatreKey="plane">
          <Plane args={[5, 5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <meshPhongMaterial attach="material" color="lightblue"  emissiveIntensity={1} metalness={1} roughness={0} />
          </Plane>
         </e.mesh>
      <e.mesh onClick={(e) => mainpulateModel(scene, aspectRatio, playPos)} theatreKey="iPhone">
        <primitive object={scene.scene} />
      </e.mesh>
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={1} intensity={1} />
        {/* <LUT lut={texture} /> */}
        <BrightnessContrast brightness={0} contrast={0.1} />
        <HueSaturation hue={0} saturation={-0.25} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
}

function mainpulateModel(mesh, aspectRatio, playPos){

  //mesh.scene.scale.set(1,1,2);
  if(aspectRatio === "16x9" && playPos === "go"){
    sheet.sequence.play({ iterationCount: 1, range: [8, 8.5] });
    // add makeModal class to id canvasWrap
   
    //wait 0.5s before playing the sequence
    setTimeout(() => {
      document.getElementById("content-layer").classList.add("makeModal");
    }, 500);
     
  }else{
    document.getElementById("content-layer").classList.remove("makeModal");
    
    // remove makeModal class to id canvasWrap
    setTimeout(() => {
      sheet.sequence.play({ iterationCount: 1, range: [8.5, 9] });
     }, 500);
  }
};

function injectToMesh(mesh, filename,materialName="Middle",typeOverride) {

  let replacementTexture;
  if (typeOverride == null){
    // try to infer the type from the filename
    const ext = filename.split(".").pop();
    if (ext === "mp4" || ext === "webm") {
      typeOverride = "video";
    } else {
      typeOverride = "image";
    }
content-layer

  }
    if (typeOverride === "video") {
      const video = document.createElement("video");
      video.src = filename;
      video.loop = true;
      video.muted = true;
      video.play();
      video.playsInline = true;

      replacementTexture = new THREE.VideoTexture(video);
      // flip the texture vertically
      replacementTexture.flipY = false;
      replacementTexture.minFilter = THREE.LinearFilter;
      replacementTexture.magFilter = THREE.LinearFilter;
      replacementTexture.format = THREE.RGBFormat;
    } else {
      replacementTexture = new THREE.TextureLoader().load(filename);
       replacementTexture.flipY = false;

    }
  mesh.scene.traverse((node) => {
    if (node.isMesh) {
      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];
      for (let i = 0; i < materials.length; i++) {
        const material = materials[i];
        if (material.name === materialName) {
          material.map = replacementTexture;
          // material.emissiveMap = replacementTexture;
          // material.emissiveIntensity = 0.2;
         // material.needsUpdate = true;
        }
      }
    }
  });
}