import * as React from 'react';
import clsx from 'clsx';
import styles from './Map.module.scss'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Task } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { useLayoutEffect } from 'react';

interface Props {
  className?: string;
  // window?: any;
}

// declare global {
  interface Window {
    H: any;
  }
// }

interface Params {
  id: string;
}

const Component: React.FC<Props> = ({ className }) => {
  // const [isLoading, setIsLoading] = useState(true)
  const params: Params = useParams();
  let thisPost = useSelector((state: Task[]) =>
    state.filter((post) => post.id === Number(params.id)),
  );
  // const history = useHistory();
  // console.log(thisPost)
  const mapRef = React.useRef(null);
  // let id: number;

  // marker: any;

  // center: any;

  // map: any;

  // let plat_form: any;
  const apikey = 'oJRLarrR9ptiJgKl0DdzVr8A0DdMNyRihnNw2D4PMz4';
  // You can get the API KEY from developer.here.com

  // @post.Action
  // public addLocation: (loca: Record<string, unknown>) => void;
  // @post.Action
  // public getPost: (id: number) => void;
  // @post.Getter
  // post!: Record<string, any>;

  // sendEmit(): void {
  //   this.$emit("marker", "marked");
  // const toogleLoading = () => {
  //   setIsLoading(false)
  // }

  useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    //     setTimeout(() => {
    //       toogleLoading()
    //     }, 1000);
    const H = window['H'];
    const platform = new H.service.Platform({
      apikey: apikey,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 0,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  //   useEffect(() => {

  //     id = Number(params.id);
  //     // Initialize the platform object:
  //     if (thisPost) {
  //       const platform = new window['H'].service.Platform({
  //         apikey: apikey,
  //       });
  //       plat_form = platform;
  //       // initializeHereMap(id, addLocation, sendEmit);
  //     initializeHereMap(id)
  //     } else {
  //       history.push(`/`);
  //     }
  //     }, [])

  //   async const initializeHereMap =(
  //     id: number,

  //     // addLocation: Function,

  //     // sendEmit: Function
  // ) => {
  //   // rendering map
  //   const mapContainer = this.$refs.hereMap;

  //   const H = await window["H"];
  //   // Obtain the default map types from the platform object
  //   var maptypes = await this.platform.createDefaultLayers();

  //   // Instantiate (and display) a map object:
  //   this.map = await new H.Map(mapContainer, maptypes.vector.normal.map, {
  //     zoom: 0,
  //     center: this.post.coord ? this.post.coord : this.center,
  //   });

  //   if (this.post.coord) {
  //     this.marker = new H.map.Marker({
  //       lat: this.post.coord.lat,
  //       lng: this.post.coord.lng,
  //     });
  //     this.map.addObject(this.marker);
  //   }
  //   await addEventListener("resize", () => this.map.getViewPort().resize());
  //   this.map.addEventListener(
  //     "tap",

  //     function (evt: any) {
  //       var coord = this.screenToGeo(
  //         evt.currentPointer.viewportX,
  //         evt.currentPointer.viewportY
  //       );
  //       if (this.marker || this.marker === undefined) {
  //         this.removeObjects(this.getObjects());
  //       }
  //       addLocation({ coord, id });
  //       this.marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
  //       this.addObject(this.marker);
  //       sendEmit();
  //     },
  //     // add behavior control
  //     new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))
  //   );
  //   // add UI
  //   H.ui.UI.createDefault(this.map, maptypes);
  // }

  return (
    <div id="map" className={clsx(className, styles.root)}>
      <div className="map" ref={mapRef} style={{ height: '500px' }}>
        {/* <Loader v-if="isLoading" /> */}
      </div>
    </div>
  );
}

export { 
  Component as Map,  
};
  