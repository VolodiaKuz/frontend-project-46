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

const getStylishFormat = (diff) => {
  const iter = (node, depth = 1) => {
    const currentIndent = makeIndent(depth);
    const closedBracketIndent = makeIndent(depth, true);
    const lines = node.map((singleNode) => {
      const mappedCurrentIndent = currentIndent.slice(2);
      const diffString = `${singleNode.keyName}: ${printValue(singleNode.keyValue, depth + 1)}`;
      if (singleNode.state === 'added') {
        return `${mappedCurrentIndent}+ ${diffString}`;
      }
      if (singleNode.state === 'similar') {
        return `${mappedCurrentIndent}  ${diffString}`;
      }
      if (singleNode.state === 'removed') {
        return `${mappedCurrentIndent}- ${diffString}`;
      }
      if (singleNode.state === 'updated') {
        const removedStr = `${mappedCurrentIndent}- ${singleNode.keyName}: ${printValue(singleNode.oldValue, depth + 1)}\n`;
        const addedStr = `${mappedCurrentIndent}+ ${singleNode.keyName}: ${printValue(singleNode.newValue, depth + 1)}`;
        return removedStr + addedStr;
      }
      if (singleNode.state === 'nested') {
        return `${currentIndent}${singleNode.keyName}: ${iter(singleNode.keyValue, depth + 1)}`;
      }
      return null;
    });
    return `{\n${lines.join('\n')}\n${closedBracketIndent}}`;
  };
  return iter(diff, 1);
};

export default getStylishFormat;
