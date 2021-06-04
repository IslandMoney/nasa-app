export class Photos {
    photos: Photo[];
}

export class Photo {
    id: number;
    img_src: string;
    earth_date: string;
    sol: number;
    camera: PhotoCamera;
    rover: Rover;
}

export class PhotoCamera {
    id: number;
    rover_id: number;
    full_name: string;
    name: string;
}

export class Rover {
    id: number;
    landing_date: string;
    launch_date: string;
    name: string;
    status: string;
}