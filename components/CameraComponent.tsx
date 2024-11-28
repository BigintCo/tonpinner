import Image from "next/image";
import React, { useRef } from "react";
import photo from "@/public/pinnerimages/photo.svg";

const CameraPhotoCapture: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const capturePhoto = async () => {
        try {
            // Kamera akışını başlat
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            // Geçici bir video elementi oluşturalım
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            // Video hazır olduğunda fotoğrafı yakalayalım
            video.onloadedmetadata = () => {
                if (canvasRef.current) {
                    const context = canvasRef.current.getContext("2d");
                    if (context) {
                        canvasRef.current.width = video.videoWidth;
                        canvasRef.current.height = video.videoHeight;
                        context.drawImage(video, 0, 0);

                        // Kamera akışını durdur
                        stream.getTracks().forEach((track) => track.stop());
                    }
                }
            };
        } catch (error) {
            console.error("Kamera erişim hatası:", error);
        }
    };
    const downloadPhoto = () => {
        if (canvasRef.current) {
          const dataUrl = canvasRef.current.toDataURL("image/jpeg");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "photo.jpg";
          link.click();
        }
      };
    return (
        <div>
            <button onClick={capturePhoto}>
                <Image alt="photo" src={photo} className="w-10 aspect-square"></Image>
            </button>
            {/* <canvas ref={canvasRef} style={{ display: "block", marginTop: "10px" }} /> */}
        </div>
    );
};

export default CameraPhotoCapture;

