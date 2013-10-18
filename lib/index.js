

function normalizeGeometry( geometry, dim, targetSize, targetCenter ) {
  geometry.computeBoundingBox();

  var box = geometry.boundingBox;
  var max = box.max;
  var min = box.min;
  var dx = max.x - min.x;
  var dy = max.y - min.y;
  var dz = max.z - min.z;
  var cx = min.x + dx/2;
  var cy = min.y + dy/2;
  var cz = min.z + dz/2;

  var offsetX = 0, offsetY = 0, offsetZ = 0;
  if ( targetCenter ) {
    offsetX = targetCenter.x || 0.0;
    offsetY = targetCenter.y || 0.0;
    offsetZ = targetCenter.z || 0.0;
  }

  var range, scale;
  switch( dim ) {
  case 0:
  case 'x':
    range = dx;
    break;
  case 1:
  case 'y':
    range = dy;
    break;
  case 2:
  case 'z':
    range = dz;
    break;
  case 'max':
    range = Math.max( dx, dy, dz );
    break;
  case 'min':
    range = Math.min( dx, dy, dz );
    break;
  default:
    throw new Error( 'normalizeGeometry: unknown dim ' + dim );
  }

  scale = targetSize/range;

  geometry.vertices.forEach( function( v, ind ) {
    v.x = ( v.x - cx ) * scale + offsetX;
    v.y = ( v.y - cy ) * scale + offsetY;
    v.z = ( v.z - cz ) * scale + offsetZ;
  } );

  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  geometry.computeCentroids();
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  geometry.verticesNeedUpdate = true;
  return geometry;
}

module.exports = exports = normalizeGeometry;
