export interface Photos {
    photos: Photo[];
}

export interface Photo {
    id: number;
    img_src: string;
    earth_date: string;
    sol: number;
    camera: PhotoCamera;
    rover: Rover;
}

export interface PhotoCamera {
    id: number;
    rover_id: number;
    full_name: string;
    name: string;
}

export interface Rover {
    id: number;
    landing_date: string;
    launch_date: string;
    name: string;
    status: string;
}