const makeIndent = (depth, closedBrackets = false, repeater = ' ', spaceCount = 4) => {
  if (closedBrackets) return repeater.repeat(spaceCount * (depth - 1));
  return repeater.repeat(spaceCount * depth);
};

const printValue = (keyValue, depth) => {
  if (typeof keyValue === 'object' && keyValue !== null) {
    const currentIndent = makeIndent(depth);
    const currentClosedBrackerIndent = makeIndent(depth, true);

    const lines = Object.entries(keyValue).map(([keyName, value]) => {
      const resultString = `${currentIndent}${keyName}: ${printValue(value, depth + 1)}`;
      return resultString;
    });
    return `{\n${lines.join('\n')}\n${currentClosedBrackerIndent}}`;
  }

  return `${keyValue}`;
};

const getDiffStr = (node, depth, indent) => {
  const diffString = `${node.keyName}: ${printValue(node.keyValue, depth + 1)}`;
  if (node.state === 'added') {
    return `${indent}+ ${diffString}`;
  }
  if (node.state === 'similar') {
    return `${indent}  ${diffString}`;
  }
  if (node.state === 'removed') {
    return `${indent}- ${diffString}`;
  }
  if (node.state === 'updated') {
    const removedStr = `${indent}- ${node.keyName}: ${printValue(node.oldValue, depth + 1)}\n`;
    const addedStr = `${indent}+ ${node.keyName}: ${printValue(node.newValue, depth + 1)}`;
    return removedStr + addedStr;
  }
  return null;
};

const getStylishFormat = (diff) => {
  const iter = (node, depth = 1) => {
    const currentIndent = makeIndent(depth);
    const closedBracketIndent = makeIndent(depth, true);
    const lines = node.map((singleNode) => {
      const mappedCurrentIndent = currentIndent.slice(2);
      if (singleNode.state === 'nested') {
        return `${currentIndent}${singleNode.keyName}: ${iter(singleNode.keyValue, depth + 1)}`;
      }
      return getDiffStr(singleNode, depth, mappedCurrentIndent);
    });
    return `{\n${lines.join('\n')}\n${closedBracketIndent}}`;
  };
  return iter(diff, 1);
};

export default getStylishFormat;
