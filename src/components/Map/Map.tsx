import * as React from 'react';
import clsx from 'clsx';
import styles from './Map.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Task, addCoord } from '../../redux/actions';
import { useHistory, useParams } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';

interface Props {
  className?: string;
  getIntel: Function;
}

interface Params {
  id: string;
}

const Component: React.FC<Props> = ({ className, getIntel }) => {
  // const [isLoading, setIsLoading] = useState(true)
  const params: Params = useParams();
  let thisPost = useSelector((state: Task[]) =>
    state['posts'].filter((post: Task) => post.id === Number(params.id)),
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const mapRef = useRef(null);

  const apikey = '2AUqeejhdr0iTZS3Em_1VQ0-I3koV7rMdRrPGroSaL4';

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    setTimeout(() => {
      //       toogleLoading()
      if (thisPost[0] === undefined) history.push(`/`);
    }, 200);
    const H = window['H'];
    const platform = new H.service.Platform({
      apikey: apikey,
    });

    const check = () => {
      if (thisPost[0]) {
        if (thisPost[0].hasOwnProperty('coord')) {
          if (thisPost[0].coord !== undefined) {
            return thisPost[0].coord !== undefined ? thisPost[0].coord : { lat: 50, lng: 5 };
          }
        }
      }
    };

    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: check(),
      zoom: 0,
      pixelRatio: window.devicePixelRatio || 1,
    });

    if (thisPost[0]) {
      if (thisPost[0].hasOwnProperty('coord')) {
        if (thisPost[0].coord !== undefined) {
          hMap.marker = new H.map.Marker({
            lat: thisPost[0]['coord']['lat'],
            lng: thisPost[0]['coord']['lng'],
          });
          hMap.addObject(hMap.marker);
        }
      }
    }
    addEventListener('resize', () => hMap.getViewPort().resize());
    hMap.addEventListener(
      'tap',

      function (evt: any) {
        let coord = hMap.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);

        if (hMap.marker || hMap.marker === undefined) {
          hMap.removeObjects(hMap.getObjects());
        }
        dispatch(addCoord(thisPost[0].id, thisPost[0].content, coord));

        hMap.marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
        hMap.addObject(hMap.marker);
        getIntel();
      },
    );

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  return (
    <div id="map" className={clsx(className, styles.root)}>
      <div className="map" ref={mapRef} style={{ height: '500px' }}>
        {/* <Loader v-if="isLoading" /> */}
      </div>
    </div>
  );
};

export { Component as Map };
