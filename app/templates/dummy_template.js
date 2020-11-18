function main() {
    {%- if id %}
    print('Hello world, {{ id }}.')
    {%- else %}
    print('Hello world.')
    {%- endif %}
}
