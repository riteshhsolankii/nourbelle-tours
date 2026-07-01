/**
 * Approximate [lat, lng] for place names used in `placesToVisit` across
 * `tour-package-details.ts`. Used by `TourMap` to plot markers/route lines.
 * Unmatched names are skipped gracefully by the map component.
 */
export const EGYPT_PLACE_COORDINATES: Record<string, [number, number]> = {
  Cairo: [30.0444, 31.2357],
  Giza: [29.9765, 31.1313],
  "Giza Plateau": [29.9773, 31.1325],
  "Great Pyramid": [29.9792, 31.1342],
  "Great Pyramid of Khufu": [29.9792, 31.1342],
  Sphinx: [29.9753, 31.1376],
  "Egyptian Museum": [30.0478, 31.2336],
  Saqqara: [29.871, 31.2164],
  Luxor: [25.6872, 32.6396],
  "Luxor Temple": [25.6995, 32.6421],
  "Karnak Temple": [25.7188, 32.6573],
  "Valley of the Kings": [25.7402, 32.6014],
  Aswan: [24.0889, 32.8998],
  "Aswan Corniche": [24.09, 32.899],
  "Philae Temple": [24.0259, 32.8845],
  "Nubian Village": [24.095, 32.88],
  "Kom Ombo": [24.4523, 32.9282],
  Edfu: [24.9781, 32.8735],
  Alexandria: [31.2001, 29.9187],
  "Alexandria Corniche": [31.2156, 29.9553],
  "Bibliotheca Alexandrina": [31.2089, 29.9092],
  "Catacombs of Kom El Shoqafa": [31.1789, 29.8814],
  Hurghada: [27.2579, 33.8116],
  "Hurghada Dunes": [27.2, 33.75],
  "Eastern Desert": [26.5, 33.5],
  "Marsa Alam": [25.0657, 34.8916],
  "Sharm El sheikh": [27.9158, 34.33],
};
